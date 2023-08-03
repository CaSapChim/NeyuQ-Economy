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

        let arr = []

        const TYCB = await client.item(message.author.id, "Tình Yêu Cháy Bỏng")
        const HHTK = await client.item(message.author.id, "Huy Hiệu Tri Kỉ") 
        const HHTT = await client.item(message.author.id, "Huy Hiệu Thân Thiết")
        const Valentine = await client.item(message.author.id, "Tri Kỉ Valentine")
        const Vday = await client.item(message.author.id, "Huy Hiệu VDay")
        const HHCD = await client.item(message.author.id, "Huy Hiệu Cặp Đôi")
        
        if (TYCB > 0) arr.push('<:tinhyeuchaybong:1136568485166718986>')
        if (HHTK > 0) arr.push('<:trik:1122444231223558174>')
        if (HHTT > 0) arr.push('<:banbe:1136575697909989426>')
        if (Valentine > 0) arr.push('<:triki:1136577819409907793>')
        if (Vday > 0) arr.push('<:valnetine:1136578277570510929>')
        if (HHCD > 0) arr.push('<:trikivalentine:1136577479679688815>')

        const huyHieu = arr

        const nhanBac = await client.item(message.author.id, 'Nhẫn bạc')
        const nhanVang = await client.item(message.author.id, 'Nhẫn vàng')
        const nhanHong = await client.item(message.author.id, 'Nhẫn hồng')

        if (nhanBac == 0 && nhanVang == 0 && nhanHong == 0) {
            const marryEmbed = new Discord.EmbedBuilder()
                .setTitle('Xem Level Mối Quan Hệ') 
                .setDescription(`
                • Huy hiệu : ${huyHieu.join(' ')}
                • Bạn đã kêt hôn với: <@${existMarry.userId2}>
                • Điểm thân mật hiện tại: ${level} 
                • Bạn đã kết hôn được: ${currentDay - existMarry.marriedAt.getDate()} ngày
                • Ngày kỉ niệm: ${moment(existMarry.marriedAt).format('DD/MM/YYYY')}`)
                .setTimestamp()
                .setImage('attachment://married.png')
                
            let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'married.png' }); 

            message.channel.send({ embeds: [marryEmbed], files: [attachment] })
        } else if (nhanBac > 0) {
            const marryEmbed2 = new Discord.EmbedBuilder()
                .setTitle('Xem Level Mối Quan Hệ') 
                .setDescription(`
                <:mauxanh:1136716708363640862> Huy hiệu : ${huyHieu.join(' ')}
                <:mauxanh:1136716708363640862> Bạn đã kêt hôn với: <@${existMarry.userId2}>
                <:mauxanh:1136716708363640862> Điểm thân mật hiện tại: **${level}** 
                <:mauxanh:1136716708363640862> Bạn đã kết hôn được: **${currentDay - existMarry.marriedAt.getDate()} ngày**
                <:mauxanh:1136716708363640862> Ngày kỉ niệm: **${moment(existMarry.marriedAt).format('DD/MM/YYYY')}**`)
                .setTimestamp()
                .setThumbnail('https://cdn.discordapp.com/attachments/1080521432032882700/1136722383626059857/traitiim.png')
                .setFooter({text: 'Một Tình Yêu Đẹp >_< '})
                .setImage('attachment://married.png')
                .setColor('#baf1ec')
                
            let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'married.png' }); // là dòng cho ảnh vào embed đó ai mà bt

            message.channel.send({ embeds: [marryEmbed2], files: [attachment] })
        } else if (nhanVang > 0) {
            const marryEmbed3 = new Discord.EmbedBuilder()
                .setTitle('Xem Level Mối Quan Hệ') 
                .setDescription(`
                <:maucam:1136722890042134558> Huy hiệu : ${huyHieu.join(' ')}
                <:maucam:1136722890042134558> Bạn đã kêt hôn với: <@${existMarry.userId2}>
                <:maucam:1136722890042134558> Điểm thân mật hiện tại: **${level}**
                <:maucam:1136722890042134558> Bạn đã kết hôn được: **${currentDay - existMarry.marriedAt.getDate()} ngày**
                <:maucam:1136722890042134558> Ngày kỉ niệm: **${moment(existMarry.marriedAt).format('DD/MM/YYYY')}**`)
                .setTimestamp()
                .setFooter({text: 'Một Tình Yêu Đẹp >_< '})
                .setThumbnail('https://cdn.discordapp.com/attachments/1080521432032882700/1136724209322704926/traitimmaucam.png')
                .setColor('#f89e65')
                .setImage('attachment://married.png')
                
            let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'married.png' }); 

            message.channel.send({ embeds: [marryEmbed3], files: [attachment] })
        } else if (nhanHong > 0) {
            const marryEmbed4 = new Discord.EmbedBuilder()
                .setTitle(`Xem Level Mối Quan Hệ
                
                <:L_:1136726934911463444><:00:1136727704071327835><:V_:1136728323658088700><:E_:1136728342851227648>`)
                .setDescription(`
                <:cham3d:1136725096933888041> Bạn đã kêt hôn với: <@${existMarry.userId2}> 
                <:cham3d:1136725096933888041> Điểm thân mật hiện tại: ${level} 
                <:cham3d:1136725096933888041> Huy hiệu đang có: 
                <:cham3d:1136725096933888041> Bạn đã kết hôn được: ${currentDay - existMarry.marriedAt.getDate()} ngày
                <:cham3d:1136725096933888041> Ngày kỉ niệm: ${moment(existMarry.marriedAt).format('DD/MM/YYYY')}`)
                .setTimestamp()
                .setImage('attachment://married.png')
                
            let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'married.png' });

            message.channel.send({ embeds: [marryEmbed4], files: [attachment] })
        }

        }
    }
