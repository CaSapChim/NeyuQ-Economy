const Discord = require("discord.js");
const profileModel = require('../../database/models/userDataJob/profileModel');
const marryModel = require('../../database/models/marryModel');
const jobModel = require('../../database/models/userDataJob/jobModel');
const thongThaoData = require('../../data/thongThaoJob.json');

module.exports = {
    name: "profile",
    aliases: ['pf'],
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() ||
        message.guild.members.cache.find((u) => u.id === args[0] || u.user.username === args[0]) ||
        message.member;
        
        let profileData = await profileModel.findOne({ userId: member.id });

        if (!profileData) 
            profileData = new profileModel({
                userId: member.id
            })     
        await profileData.save();

        const followers = profileData.follower.length;
        const followings = profileData.following.length;
        const existMarry = await marryModel.findOne({ $or: [{ userId1: member.id}, {userId2: member.id }] });
        const slogan = profileData.slogan;
        
        if (existMarry) {
            profileData.isMarried = true;
            await profileData.save();
        }
        
        let jobData = await jobModel.findOne({ userId: member.id });
        if (!jobData)
            jobData = new jobModel({ userId: member.id });        
        await jobData.save();

        const [
            lvlMiner,
            lvlFisher,
            lvlFarmer,
            limitMiner,
            limitFisher,
            limitFarmer,
            thongThaoMiner,
            thongThaoFarmer,
            thongThaoFisher,
        ] = await Promise.all([
            client.lvl(member.id, "miner"),
            client.lvl(member.id, "fisher"),
            client.lvl(member.id, "farmer"),
            client.limit(member.id, "miner"),
            client.limit(member.id, "fisher"),
            client.limit(member.id, "farmer"),
            client.thongThao(member.id, "miner"),
            client.thongThao(member.id, "farmer"),
            client.thongThao(member.id, "fisher"),
        ])

        

        let profileEmbed = new Discord.EmbedBuilder()
            .setTitle(`PROFILE CỦA ${member.displayName}`)
            .setDescription(`
                > Slogan: ${slogan} - <@${member.id}>

                > Tình trạng hôn nhân: ${profileData.isMarried == true ? `Đã kết hôn với ${existMarry.userId1 == member.id ? `<@${existMarry.userId2}>` : `<@${existMarry.userId1}>`}` : `Còn độc thân`}
            `)   
            .addFields(
                {name: `Nickname`, value: `\`\`\`${member.nickname || "Không có"}\`\`\``, inline: true},
                {name: `Followers`, value: `\`\`\`${followers}\`\`\``, inline: true},
                {name: `Followings`, value: `\`\`\`${followings}\`\`\``, inline: true},
                {name: `Thông thạo nghề Mine`, value: `\`\`\`${thongThaoData.miner[thongThaoMiner]} (${lvlMiner}/${limitMiner})\`\`\``, inline: true},
                {name: `Thông thạo nghề Câu cá`, value: `\`\`\`${thongThaoData.fisher[thongThaoFisher]} (${lvlFisher}/${limitFisher})\`\`\``, inline: true},
                {name: `Thông thạo nghề Nông dân`, value: `\`\`\`${thongThaoData.farmer[thongThaoFarmer]} (${lvlFarmer}/${limitFarmer})\`\`\``, inline: true},
            )
            .setColor(profileData.color)
            .setTimestamp()
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
            .addComponents(profileData.follower.includes(message.author.id) ? unFollowBtn : followBtn)
        const eidtBtnRow = new Discord.ActionRowBuilder()
            .addComponents(new Discord.ButtonBuilder()
                .setCustomId("editPf")
                .setLabel("Chỉnh sửa profile")
                .setStyle(Discord.ButtonStyle.Primary)
            )
        let a;
        if (member.id === message.author.id)
            a = await message.reply({ embeds: [profileEmbed], components: [eidtBtnRow] });
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
                interaction.reply({ content: `Bạn đã following ${member.displayName} thành công.`, ephemeral: true });
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
                console.log("lỗi editPf:", err);
            })
        })
    }
}