const Discord = require('discord.js');
const khoangSanModel = require('../../database/models/userDataJob/userKSModel');
const caModel = require('../../database/models/userDataJob/userFishModel');
const userFarmModel = require('../../database/models/userDataJob/userFarmModel');

module.exports = {
    name: 'job',
    cooldownn: 5,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const existJob = await client.checkJob(message.author.id);
        if (existJob) 
            return message.reply(`Bạn đã chọn nghề **${existJob}** rồi`).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
            });
        let embed = new Discord.EmbedBuilder()
            .setColor(0xc878e2)
            .setTitle(`HÃY CHỌN MỘT NGHỀ NGHIỆP CHO BẠN`)
            .setDescription(`
            Mỗi nghề nghiệp sẽ có cách kiếm tiền khác nhau (Số tiền kiếm đc như nhau)
            <a:Glitch_warn:1166628298374266971> **__Lưu ý__: **Một khi đã chọn thì các bạn không thể chọn lại nghề khác\n
            Do đó phải suy nghĩ kĩ trước khi chọn.
            `)
            .setTimestamp()
            .setFooter({ text: "Chúc bạn chơi game vui vẻ "})
        let buttonRow = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('ngudan')
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel("Nghề ngư dân"),
            new Discord.ButtonBuilder()
                .setCustomId('thomo')
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel("Nghề thợ mỏ"),
            new Discord.ButtonBuilder()
                .setCustomId('nongdan')
                .setStyle(Discord.ButtonStyle.Primary)
                .setLabel("Nghề nông dân")
        )
        const a = await message.reply({ embeds: [embed], components: [buttonRow] });
        var collector = a.createMessageComponentCollector({
            filter: interaction => (interaction.isButton()) && interaction.message.author.id == client.user.id
        });

        function embedHandler(job, userId) {
            let successEmbed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`Chúc mừng <@${userId}> đã chọn thành công nghề **${job}**`)
                .setTimestamp()
            return successEmbed;
        }
        collector.on("collect", async (interaction) => {
            if (interaction.user.id != message.author.id) return interaction.reply({ content: "Hey, nút này không dành cho bạn", ephemeral: true});
            if (interaction.customId == "ngudan") {
                await client.addJob(interaction.user.id, "Ngư dân");
                const newUserFish = new caModel({
                    userId: interaction.user.id,
                });
                await newUserFish.save();
                await a.edit({ embeds: [embedHandler("ngư dân <a:Minecraft_Fish:1166253935808499743>", interaction.user.id)], components: [] });
            }
            else if (interaction.customId == 'thomo') {
                await client.addJob(interaction.user.id, "Thợ mỏ");
                const newUserKS = new khoangSanModel({
                    userId: interaction.user.id
                });
                await newUserKS.save();
                await a.edit({ embeds: [embedHandler("thợ mỏ <a:mcenchantedpicka:1166253932545323008>", interaction.user.id)], components: [] });
            }
            else if (interaction.customId == 'nongdan') {
               await client.addJob(interaction.user.id, "Nông dân");
               const newUserFarm = new userFarmModel({
                    userId: interaction.user.id
               })
               await newUserFarm.save();
               await a.edit({ embeds: [embedHandler("nông dân <a:minecraftenchant:1166253939658866698>", interaction.user.id)], components: [] });             
            }
        })
    }
}