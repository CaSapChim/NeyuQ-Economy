const Discord = require("discord.js");
const profileModel = require('../../database/models/userDataJob/profileModel');
const marryModel = require('../../database/models/marryModel');
const jobModel = require('../../database/models/userDataJob/jobModel');
const premiumModel = require('../../database/models/userDataJob/premiumModel');
const thongThaoData = require('../../data/thongThaoJob.json');
const thongKeModel = require('../../database/models/userDataJob/thongKeModel');
const emoji = require('../../emoji.json');

module.exports = {
    name: "profile",
    aliases: ['pf'],
    description: "Xem profile của mình hoặc người khác",
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        try {
            const member = message.mentions.members.first() ||
            message.guild.members.cache.find((u) => u.id === args[0] || u.user.username === args[0]) ||
            message.member;
            
            let profileData = await profileModel.findOne({ userId: member.id });

            let thanhTuuData = await thongKeModel.findOne({ userId: member.id });

            const followers = profileData.follower.length;
            const followings = profileData.following.length;
            let existMarry = await marryModel.findOne({ $or: [{ userId1: member.id}, {userId2: member.id }] });

            let msg = ``;
            if (existMarry) {
                msg += `Đã kết hôn với ${existMarry.userId1 == member.id ? `<@${existMarry.userId2}>` : `<@${existMarry.userId1}>`}`;
            }
            else {
                msg += `Còn độc thân`;
            }
                
            const slogan = profileData.slogan;

            let premiumData = await premiumModel.findOne({ userId: message.author.id });        

            let profileEmbed = new Discord.EmbedBuilder()
                .setTitle(`PROFILE CỦA ${member.displayName}`)
                .setColor(profileData.color)
                .setDescription(`
                    > <:NQG_honnhan:1179090314246504489> Slogan: ${slogan} - <@${member.id}>

                    > <a:NQG_heart22:1167846298372816987> Tình trạng hôn nhân: ${msg}

                    > <a:premium:1179094493438427206> Premium : ${premiumData.premium == true ? "Có" : "Không có"}
                `)   
                .addFields(
                    {name: `<:NQG_Nickname:1179089980447019028> | Nickname`, value: `\`\`\`${member.nickname || "Không có"}\`\`\``, inline: true},
                    {name: `<:NQG_info:1179088561132273724> | Followers`, value: `\`\`\`${followers}\`\`\``, inline: true},
                    {name: `<:NQG_flow:1179088827051159622> | Followings`, value: `\`\`\`${followings}\`\`\``, inline: true},
                )
                .setTimestamp()
                .setThumbnail(member.displayAvatarURL())
                
                let thanhTuuEmbed = new Discord.EmbedBuilder()
                .setTitle(`THỐNG KÊ CỦA ${member.displayName}`)
                .setColor(profileData.color)
                .setDescription(`
                    > <a:mcenchantedpicka:1166253932545323008> Số lần đào mỏ: ${thanhTuuData.mine} 

                    > <a:Minecraft_Fish:1166253935808499743> Số lần câu cá: ${thanhTuuData.cauca} 

                    > <a:minecraftenchant:1166253939658866698> Số lần trồng trọt: ${thanhTuuData.farm} 
                `)
                .addFields(
                    {name: `<:diamond92:1179255142651011122> | Số ngọc titan đào được`, value: `\`\`\`${thanhTuuData.titan}\`\`\``, inline: true},
                    {name: `<:DiamondPurple:1179255138276356207> | Số ngọc ametit đào được`, value: `\`\`\`${thanhTuuData.ametit}\`\`\``, inline: true},
                    {name: `<:sapphire_gem:1179255149043134464> | Số ngọc saphir đào được`, value: `\`\`\`${thanhTuuData.saphir}\`\`\``, inline: true},
                    {name: `<:gem_ruby83:1179255146643988500> | Số ngọc ruby đào được`, value: `\`\`\`${thanhTuuData.ruby}\`\`\``, inline: true},
                    {name: `${emoji.veryRare} | Số cá Very Rare bắt được`, value: `\`\`\`${thanhTuuData.veryRare}\`\`\``, inline: true},
                    {name: `${emoji.legendary} | Số cá Legendary bắt được`, value: `\`\`\`${thanhTuuData.legendary}\`\`\``, inline: true},
                )
                .setThumbnail(member.displayAvatarURL())


            const followBtn = new Discord.ButtonBuilder()
                .setCustomId("follow")
                .setLabel(`Follow ${member.displayName}`)
                .setStyle(Discord.ButtonStyle.Success)
            const unFollowBtn = new Discord.ButtonBuilder()
                .setCustomId("unfollow")
                .setLabel(`Unfollow ${member.displayName}`)
                .setStyle(Discord.ButtonStyle.Danger)
            const btnRow = new Discord.ActionRowBuilder()
                .addComponents(
                    profileData.follower.includes(message.author.id) ? unFollowBtn : followBtn, 
                    new Discord.ButtonBuilder()
                        .setCustomId("thanhtuu")
                        .setLabel("Thống kê")
                        .setStyle(Discord.ButtonStyle.Primary)
                )
            const editBtnRow = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("editPf")
                        .setLabel("Chỉnh sửa profile")
                        .setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder()
                        .setCustomId("thanhtuu")
                        .setLabel("Thống kê")
                        .setStyle(Discord.ButtonStyle.Primary)
                )
            let a;
            if (member.id === message.author.id)
                a = await message.reply({ embeds: [profileEmbed], components: [editBtnRow] });
            else 
                a = await message.reply({ embeds: [profileEmbed], components: [btnRow] });

            var collector = a.createMessageComponentCollector({
                filter: (interaction) =>
                    interaction.isButton() &&
                    interaction.message.author.id == client.user.id, time: 30000
            });

            collector.on("collect", async interaction => {
                if(interaction.user.id != message.author.id) return interaction.reply({ content: "Hey, nút này không dành cho bạn", ephemeral: true});
                if (interaction.customId === "follow") {
                    await profileModel.findOneAndUpdate(
                        { userId: member.id },
                        { $push: {follower: interaction.user.id} },
                        { new: true, upsert: true }
                    )
                    await profileModel.findOneAndUpdate(
                        { userId: message.author.id },
                        { $push: {following: member.id } },
                        { new: true, upsert: true }
                    )
                    interaction.reply({ content: `Bạn đã follow ${member.displayName} thành công.`, ephemeral: true });
                    member.send(`${interaction.user.username} - ${interaction.user.id} vừa theo dõi bạn.`);
                }
                else if (interaction.customId === "unfollow") {
                    const profileAuthor = await profileModel.findOne({ userId: message.author.id });
                    const profileOtherUser = await profileModel.findOne({ userId: member.id });

                    let idToRemove = profileAuthor.following.indexOf(Number(member.id));
                    profileAuthor.following.splice(idToRemove, 1);
                    await profileAuthor.save();

                    idToRemove = profileOtherUser.follower.indexOf(Number(message.author.id));
                    profileOtherUser.follower.splice(idToRemove, 1);
                    await profileOtherUser.save();

                    interaction.reply({ content: `Bạn đã bỏ theo dõi ${member.displayName} thành công`, ephemeral: true });
                } 
                else if (interaction.customId === "thanhtuu") {
                    await a.edit({ embeds: [thanhTuuEmbed] });
                } 
                else {
                    const modal = new Discord.ModalBuilder()
                        .setCustomId('editPfModal')
                        .setTitle("CHỈNH SỬA PROFILE CỦA MÌNH")
                    const mau = new Discord.TextInputBuilder()
                        .setCustomId('mau')
                        .setLabel("Nhập mã màu hex")
                        .setPlaceholder("Vd: #26c2ed")
                        .setRequired(false)
                        .setStyle(Discord.TextInputStyle.Short)
                    const slg = new Discord.TextInputBuilder()
                        .setCustomId('slg')
                        .setLabel("Nhập một câu slogan của mình")
                        .setPlaceholder("Vd: Yeu duong vo van")
                        .setRequired(false)
                        .setStyle(Discord.TextInputStyle.Short)
                    const firstActionRow = new Discord.ActionRowBuilder().addComponents(mau);
                    const secondActionRow = new Discord.ActionRowBuilder().addComponents(slg);
                    modal.addComponents(firstActionRow, secondActionRow);
                    await interaction.showModal(modal);
                }
                const filter = (interaction) => interaction.customId == "editPfModal";
                interaction.awaitModalSubmit({ filter, time: 30_000})
                .then(async interaction => {
                    let t1 = interaction.fields.getTextInputValue("mau");
                    let t2 = interaction.fields.getTextInputValue("slg");
                    if (t1.length != 7 || t1.slice(0, 1) != "#") {
                        return interaction.reply({ content: `Mã màu bạn nhập không đúng định dạng.`, ephemeral: true}); 
                    }
                    profileData.color = t1;
                    profileData.slogan = t2;
                    await profileData.save();
                    interaction.reply({ content: `Bạn đã chỉnh sửa profile của mình thành công.`, ephemeral: true});
                }).catch(err => {
                    console.log("Đây là tính năng");
                })
            })
        } catch {
            await message.reply(`Không tìm thấy người dùng này vì họ chưa cấu hình tài khoản.`);
        }
    }
}