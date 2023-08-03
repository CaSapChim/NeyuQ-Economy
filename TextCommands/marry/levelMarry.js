const Discord = require('discord.js');
const marryModel = require('../../database/models/marryModel')
const Canvas = require('canvas')
const moment = require('moment')

module.exports = {
    name: 'lv',
    aliases: ["lv", "level"],
    description: 'Cho phép member xem level của nhau',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {*} userData
     */
    run: async (client, message, args, userData) => {
        const existMarry = await marryModel.findOne({ $or: [{userId1: message.author.id}, {userId2: message.author.id}] })
        if (!existMarry) return message.channel.send('Có NY Đâu Mà Coi Level LÊU LÊU <a:NQG_leuleu:1136579769429925939><a:NQG_leuleu:1136579769429925939> ')
        const level = await client.marryLevel(message.author.id)

        const currentDay = new Date(Date.now()).getDate()

        let canvas = Canvas.createCanvas(384, 128); 
        let ctx = canvas.getContext('2d');
        
        let userAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId1)).displayAvatarURL({ extension: 'png'}));
        let partnerAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId2)).displayAvatarURL({ extension: 'png'}));
        let heartImage = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1071394444567400489/1128759034833555577/traitim.png');
        
        ctx.drawImage(userAvatar, 0, 0, 128, 128);
        ctx.drawImage(heartImage, 128, 0, 128, 128);
        ctx.drawImage(partnerAvatar, 256, 0, 128, 128); 

        const marryEmbed = new Discord.EmbedBuilder()
            .setTitle('Xem Level Mối Quan Hệ') // Embed đầu tiên ko custom
            .setDescription(`
            • Bạn đã kêt hôn với: <@${existMarry.userId2}>
            • Điểm thân mật hiện tại: ${level} 
            • Bạn đã kết hôn được: ${currentDay - existMarry.marriedAt.getDate()} ngày
            • Ngày kỉ niệm: ${moment(existMarry.marriedAt).format('DD/MM/YYYY')}`)
            .setTimestamp()
            .setImage('attachment://married.png')
            
        let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), 'married.png'); // là dòng cho ảnh vào embed đó ai mà bt

        message.channel.send({ embeds: [marryEmbed], files: [attachment] }) // do dòng này hả hmm t vt sai à

    }
}