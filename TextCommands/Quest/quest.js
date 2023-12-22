const UserQuest = require('../../database/models/userDataJob/userGiaoHangModel');
const premiumModel = require('../../database/models/userDataJob/premiumModel');
const quests = require('../../data/giaoHang.json');
const Discord = require('discord.js');
const emoji = require('../../emoji.json');  

module.exports = {
    name: 'quest',
    aliases: ['q'],
    description: "Hiển thị nhiệm vụ giao hàng của mình",
    cooldown: 5,
    run: async (client, message, args) => {
        try {
            const memberId = message.author.id;
            let userQuest = await UserQuest.findOne({ userId: memberId });

            if (!userQuest) {
                await takeOrNewUserQuestDB(memberId);
                await giveQuestForUser(memberId);
            }

            await displayUserQuestsAndSend(memberId, message, client);
        } catch (error) {
            console.error('Lỗi khi thực hiện lệnh quest:', error);
        }
    },
}

const giveQuestForUser = async (memberId) => {
    let userQuest = await UserQuest.findOne({ userId: memberId });
    const userPre = await premiumModel.findOne({ userId: memberId });

    for (const questType in quests) {
        const handlerRandomQuest = {
            "giaohang": async () => {
                const botQuests = Object.keys(quests.giaohang);
                for (let count = 1; count <= 3; count++) {
                    const randomQuestType = botQuests[Math.floor(Math.random() * botQuests.length)];
                    const rand = Math.floor(Math.random() * quests.giaohang[randomQuestType].requirement.length);
                    userQuest.giaohang[randomQuestType].enable = true;
                    userQuest.giaohang[randomQuestType].requirement = quests.giaohang[randomQuestType].requirement[rand];
                    userQuest.giaohang[randomQuestType].reward = userPre.premium ? quests.giaohang[randomQuestType].reward_0[rand] : quests.giaohang[randomQuestType].reward[rand];

                    await userQuest.save();
                }
                
            }
        }
        const generationQuest = handlerRandomQuest[questType];
        await generationQuest();
        await userQuest.save();
    }
}


const takeOrNewUserQuestDB = async (memberId) => {
    let userQuestData = new UserQuest({ userId: memberId });
    await userQuestData.save();
}

async function displayUserQuestsAndSend(memberId, message, client) {
    try {
        const userQuest = await UserQuest.findOne({ userId: memberId });
        const userPre = await premiumModel.findOne({ userId: memberId });

        let questMessage = `📜 **Nhiệm vụ - ${userPre.premium ? "Premium" : "Bình thường"}**\n\n`;

        for (const [questType, quest] of Object.entries(userQuest.giaohang || {})) {
            if (!quest.enable) continue;
            const questInfo = quests.giaohang[questType];
            if (questInfo) {
                questMessage += `${quest.isCompleted ? "<a:check:1166534052510187560>" : "<a:xo_cross:1166752009840500857>"} **|** **\`${questInfo.id}\`** **|** ${questInfo.title} **__${quest.requirement}__** ${questInfo.description}\n <:present_box98:1180533444795707484> **Thưởng** | ${(quest.reward).toLocaleString("En-Us")} ${emoji.coin}\n\n`; // quest giaohang
            }
        }

        const questEmbed = new Discord.EmbedBuilder()
            .setDescription(questMessage)
            .setColor(0xd48eec)
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/attachments/1080521432032882700/1181452974669697034/ab467f8f-9f37-41eb-9d10-598da54674c6.png?ex=65811cd3&is=656ea7d3&hm=9f9acdbf1f092c9676c9b8179552ba3cba0879dc66dcfa0838dd315d30ceed9d&")
            .setFooter({ text: `Dùng lệnh nqg reroll để đổi quest`})

        await message.reply({ embeds: [questEmbed] });
         
    } catch (error) {
        console.error('Lỗi khi hiển thị hoặc gửi quest:', error);
    }
}

