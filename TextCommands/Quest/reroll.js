const UserQuest = require('../../database/models/userDataJob/userGiaoHangModel');
const quests = require('../../data/giaoHang.json');
const Discord = require('discord.js');
const emoji = require('../../emoji.json');  

module.exports = {
    name: 'reroll',
    aliases: ['rr'],
    description: "Thay đổi toàn bộ nhiệm vụ hiện tại",
    cooldown: 5,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @returns 
     */
    run: async (client, message, args) => {
        try {
            const memberId = message.author.id;
            let userQuest = await UserQuest.findOne({ userId: memberId });

            if (!userQuest) return message.reply(`${emoji.fail} Bạn chưa nhận nhiệm vụ nào.\nDùng lệnh **\`nqg quest\`** để nhận nhiệm vụ!`);

            await askUser(message, client);
        } catch (error) {
            console.error('Lỗi khi thực hiện lệnh reroll:', error);
        }
    },
}

const giveQuestForUser = async (memberId) => {
    let userQuest = await UserQuest.findOne({ userId: memberId });
    for (const questType in quests) {
        const handlerRandomQuest = {
            "giaohang": async () => {
                const botQuests = Object.keys(quests.giaohang);
                for (let count = 1; count <= 3; count++) {
                    const randomQuestType = botQuests[Math.floor(Math.random() * botQuests.length)];
                    const rand = Math.floor(Math.random() * quests.giaohang[randomQuestType].requirement.length);
                    userQuest.giaohang[randomQuestType].enable = true;
                    userQuest.giaohang[randomQuestType].requirement = quests.giaohang[randomQuestType].requirement[rand];
                    userQuest.giaohang[randomQuestType].reward = quests.giaohang[randomQuestType].reward[rand];

                    await userQuest.save();
                }
                
            }
        }
        const generationQuest = handlerRandomQuest[questType];
        await generationQuest();
        await userQuest.save();
    }
}

const deleteQuestForUser = async(memberId) => {
    await UserQuest.deleteOne({ userId: memberId })
}

const takeOrNewUserQuestDB = async (memberId) => {
    let userQuestData = new UserQuest({ userId: memberId });
    await userQuestData.save();
}

const askUser = async (message, client) => {
    await message.delete();
    const isAcceptEmbed = new Discord.EmbedBuilder()
    .setColor(0xd48eec)
    .setDescription(`Bạn có muốn tiếp tục đổi nhiệm vụ khác không ?\nPhí đổi là 5,000 ${emoji.coin}`)
    .setTimestamp()

    const isAcceptBtnRow = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
            .setCustomId("accept")
            .setLabel("ĐỒNG Ý")
            .setEmoji("👍")
            .setStyle(Discord.ButtonStyle.Success),
        new Discord.ButtonBuilder()
            .setCustomId("decline")
            .setLabel("TỪ CHỐI")
            .setEmoji("👎")
            .setStyle(Discord.ButtonStyle.Danger)
    )

    const a = await message.channel.send({ content: `<@${message.author.id}>`, embeds: [isAcceptEmbed], components: [isAcceptBtnRow] })

    var collector = a.createMessageComponentCollector({
        filter: (interaction) =>
          interaction.isButton() &&
          interaction.message.author.id == client.user.id, time: 30000
    });

    collector.on("collect", async(interaction) => {
        if(interaction.user.id != message.author.id) return interaction.reply({ content: "Hey, nút này không dành cho bạn", ephemeral: true});
        if (interaction.customId == "decline") {
            return a.edit({ content: `<@${interaction.user.id}> đã từ chối thay đổi nhiệm vụ.`, embeds: [], components: [] });
        }
        else {
            const balanceUser = await client.xemTien(interaction.user.id);
            if (balanceUser < 5000) return a.edit({ content: `${emoji.fail} Bạn không đủ tiền để thay đổi nhiệm vụ!`, embeds: [], components: [] });
            await client.truTien(interaction.user.id, 5000);
            await a.edit({ content: `<a:Loading:1181525113435336754>`, embeds: [], components: [] });
            await deleteQuestForUser(interaction.user.id);
            await takeOrNewUserQuestDB(interaction.user.id);
            await giveQuestForUser(interaction.user.id);
            await displayUserQuestsAndSend(interaction.user.id, a);
        }
    })
}

const displayUserQuestsAndSend = async (memberId, a) => {
    try {
        const userQuest = await UserQuest.findOne({ userId: memberId });

        let questMessage = '📜 **Nhiệm vụ**\n\n';

        for (const [questType, quest] of Object.entries(userQuest.giaohang || {})) {
            if (!quest.enable) continue;
            const questInfo = quests.giaohang[questType];
            if (questInfo) {
                questMessage += `<:chamxanh:1124058113742479400> **\`${questInfo.id}\`** | ${questInfo.title} **__${quest.requirement}__** ${questInfo.description}\n <:present_box98:1180533444795707484> **Thưởng** | ${(quest.reward).toLocaleString("En-Us")} ${emoji.coin}\n\n`; // quest giaohang
            }
        }

        const questEmbed = new Discord.EmbedBuilder()
            .setDescription(questMessage)
            .setColor(0xd48eec)
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/attachments/1080521432032882700/1181452974669697034/ab467f8f-9f37-41eb-9d10-598da54674c6.png?ex=65811cd3&is=656ea7d3&hm=9f9acdbf1f092c9676c9b8179552ba3cba0879dc66dcfa0838dd315d30ceed9d&")

        await a.edit({ content: `<@${memberId}> đã thay đổi nhiệm vụ thành công!`, embeds: [questEmbed] });
        
    } catch (error) {
        console.error('Lỗi khi hiển thị hoặc gửi quest:', error);
    }
}