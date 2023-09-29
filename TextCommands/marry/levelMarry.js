const Discord = require('discord.js');
const marryModel = require('../../database/models/marryModel')
const Canvas = require('canvas')
const moment = require('moment')

module.exports = {
    name: 'lvmarry',
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

        const currentDay = new Date()
        const timeDifference = currentDay - existMarry.marriedAt
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

        const nhanBac = await client.item(message.author.id, 'Nhẫn bạc')
        const nhanVang = await client.item(message.author.id, 'Nhẫn vàng')
        const nhanHong = await client.item(message.author.id, 'Nhẫn hồng')

        const [
            TYCB,
            HHTK,
            HHTT,
            Valentine,
            Vday,
            HHCD,
            HHTY
          ] = await Promise.all([
            client.item(message.author.id, "Tình Yêu Cháy Bỏng"),
            client.item(message.author.id, "Huy Hiệu Tri Kỉ"),
            client.item(message.author.id, "Huy Hiệu Thân Thiết"),
            client.item(message.author.id, "Tri Kỉ Valentine"),
            client.item(message.author.id, "Huy Hiệu VDay"),
            client.item(message.author.id, "Huy Hiệu Cặp Đôi"),
            client.item(message.author.id, "Huy Hiệu Tình Yêu")
          ]);
          
          const arr = [];
          
          if (TYCB > 0) arr.push('<:tinhyeuchaybong:1136568485166718986>');
          if (HHTK > 0) arr.push('<:trik:1122444231223558174>');
          if (HHTT > 0) arr.push('<:banbe:1136575697909989426>');
          if (Valentine > 0) arr.push('<:triki:1136577819409907793>');
          if (Vday > 0) arr.push('<:valnetine:1136578277570510929>');
          if (HHCD > 0) arr.push('<:trikivalentine:1136577479679688815>');
          if (HHTY > 0) arr.push('<:NQG_traitimne:1155502689057259621>');

        const huyHieu = arr

        if (nhanBac == 0 && nhanVang == 0 && nhanHong == 0) {
            let canvas = Canvas.createCanvas(384, 128); 
            let ctx = canvas.getContext('2d');
            
            let userAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId1)).displayAvatarURL({ extension: 'png'}));
            let partnerAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId2)).displayAvatarURL({ extension: 'png'}));
            let heartImage = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1138141730928070736/1138769093437181973/love1.png');
            
            ctx.drawImage(userAvatar, 0, 0, 128, 128);
            ctx.drawImage(heartImage, 128, 0, 128, 128);
            ctx.drawImage(partnerAvatar, 256, 0, 128, 128)

            const marryEmbed = new Discord.EmbedBuilder() // userId1: Mèo
                .setTitle('Xem Level Mối Quan Hệ')        // userId2: Cá
                .setDescription(`
                • Huy hiệu đang có: ${huyHieu.join(' ')}
                • Bạn đã kêt hôn với: <@${existMarry.userId2 === message.author.id ? existMarry.userId1 : existMarry.userId2}>
                • Điểm thân mật hiện tại: ${level} 
                • Bạn đã kết hôn được: ${daysDifference} ngày
                • Ngày kỉ niệm: ${moment(existMarry.marriedAt).format('DD/MM/YYYY')}`)
                .setTimestamp()
                .setImage('attachment://married.png')
                
            let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'married.png' }); 

            message.channel.send({ embeds: [marryEmbed], files: [attachment] })
        }
        else if (nhanBac > 0) {
            let canvas = Canvas.createCanvas(384, 128); 
            let ctx = canvas.getContext('2d');
            
            let userAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId1)).displayAvatarURL({ extension: 'png'}));
            let partnerAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId2)).displayAvatarURL({ extension: 'png'}));
            let heartImage = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1071394444567400489/1128759034833555577/traitim.png');
            
            ctx.drawImage(userAvatar, 0, 0, 128, 128);
            ctx.drawImage(heartImage, 128, 0, 128, 128);
            ctx.drawImage(partnerAvatar, 256, 0, 128, 128) 

            const marryEmbed2 = new Discord.EmbedBuilder()
            .setTitle('Xem Level Mối Quan Hệ') 
            .setDescription(`
            <:mauxanh:1136716708363640862> Huy hiệu đang có: ${huyHieu.join(' ')}
            <:mauxanh:1136716708363640862> Bạn đã kêt hôn với: <@${existMarry.userId2 === message.author.id ? existMarry.userId1 : existMarry.userId2}>
            <:mauxanh:1136716708363640862> Điểm thân mật hiện tại: **${level}** 
            <:mauxanh:1136716708363640862> Bạn đã kết hôn được: **${daysDifference} ngày**
            <:mauxanh:1136716708363640862> Ngày kỉ niệm: **${moment(existMarry.marriedAt).format('DD/MM/YYYY')}**
            <:mauxanh:1136716708363640862> Độc Quyền: Nhẫn Bạc`)
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/attachments/1080521432032882700/1136722383626059857/traitiim.png')
            .setFooter({text: 'Một Tình Yêu Đẹp >_< '})
            .setImage('attachment://married.png')
            .setColor('#baf1ec')
            
        let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'married.png' }); // là dòng cho ảnh vào embed đó ai mà bt

        message.channel.send({ embeds: [marryEmbed2], files: [attachment] })
        } else if (nhanVang > 0) {
            let canvas = Canvas.createCanvas(384, 128); 
            let ctx = canvas.getContext('2d');
            
            let userAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId1)).displayAvatarURL({ extension: 'png'}));
            let partnerAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId2)).displayAvatarURL({ extension: 'png'}));
            let heartImage = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1138141730928070736/1138770326537392168/love2.png');
            
            ctx.drawImage(userAvatar, 0, 0, 128, 128);
            ctx.drawImage(heartImage, 128, 0, 128, 128);
            ctx.drawImage(partnerAvatar, 256, 0, 128, 128)

            let thumbn = [
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137056070964092928/tim1.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137056251486949456/tim2.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137057356304351394/tim3.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137057356526653560/tim4.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137057356807688202/tim5.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137058617187651654/tim_6.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137058659126485082/tim7.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137058659399123014/tim8.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137058659696910396/tim9.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1137058659990503504/tim10.png',
           ]
           const marryEmbed3 = new Discord.EmbedBuilder()
               .setTitle(`Xem Level Mối Quan Hệ
               
               <:ll:1137053770774229043><:__:1137053857621483671><:vv:1137053893960933528><:ee:1137053939855020083>`) 
               .setDescription(`
               <:maucam:1136722890042134558> Huy hiệu đang có: ${huyHieu.join(' ')}
               <:maucam:1136722890042134558> Bạn đã kêt hôn với: <@${existMarry.userId2 === message.author.id ? existMarry.userId1 : existMarry.userId2}>
               <:maucam:1136722890042134558> Điểm thân mật hiện tại: **${level}**
               <:maucam:1136722890042134558> Bạn đã kết hôn được: **${daysDifference} ngày**
               <:maucam:1136722890042134558> Ngày kỉ niệm: **${moment(existMarry.marriedAt).format('DD/MM/YYYY')}**
               <:maucam:1136722890042134558> Độc Quyền: Nhẫn Vàng
               
               <:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140><:gachcam:1137049788576174140>`)
               .setTimestamp()
               .setFooter({text: 'Một Tình Yêu Đẹp >_< '})
               .setThumbnail(thumbn[Math.floor(Math.random() * thumbn.length)])
               .setColor('#f89e65')
               .setImage('attachment://married.png')
               
           let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'married.png' }); 

           message.channel.send({ embeds: [marryEmbed3], files: [attachment] })
        } else if (nhanHong > 0) {
            let canvas = Canvas.createCanvas(384, 128); 
            let ctx = canvas.getContext('2d');
            
            let userAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId1)).displayAvatarURL({ extension: 'png'}));
            let partnerAvatar = await Canvas.loadImage((await client.users.fetch(existMarry.userId2)).displayAvatarURL({ extension: 'png'}));
            let heartImage = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1138141730928070736/1138771609512058900/love3.png');
            
            ctx.drawImage(userAvatar, 0, 0, 128, 128);
            ctx.drawImage(heartImage, 128, 0, 128, 128);
            ctx.drawImage(partnerAvatar, 256, 0, 128, 128)

            let thumb = [
                'https://cdn.discordapp.com/attachments/1080521432032882700/1136745550767718420/vuonmieng.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1136745551048749066/vuonmieng1.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1136745551317188670/vuonmieng2.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1136745551677894797/vuongmieng3.png',
                'https://cdn.discordapp.com/attachments/1080521432032882700/1136745551942140014/vuongmieng4.png'  
            ]

            const marryEmbed4 = new Discord.EmbedBuilder()
                .setTitle(`Xem Level Mối Quan Hệ
                
                <:L_:1136726934911463444><:00:1136727704071327835><:V_:1136728323658088700><:E_:1136728342851227648>`)
                .setDescription(`
                > <:huyhieuj:1137002449736040528> | Huy hiệu đang có: ${huyHieu.join(' ')}
                > <:kethon:1137002986472747160> | Bạn đã kêt hôn với: <@${existMarry.userId2 === message.author.id ? existMarry.userId1 : existMarry.userId2}> 
                > <:thanmat:1137004383008194631> | Điểm thân mật hiện tại: **${level}** 
                > <:daymarry:1137003685659033631> | Bạn đã kết hôn được: **${daysDifference} ngày**
                > <:day:1137004327848914954> | Ngày kỉ niệm: **${moment(existMarry.marriedAt).format('DD/MM/YYYY')}**
                > <:laplanh:1137007267439460474> | Độc quyền: Nhẫn Hồng 
                
                <:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646><:gachhong:1137042601313304646>`)
                .setFooter({text: 'Một Tình Yêu Đẹp >_< '}) 
                .setTimestamp()
                .setColor('#fd9a95')
                .setThumbnail(thumb[Math.floor(Math.random() * thumb.length)])  
                .setImage('attachment://married.png')
                
            let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'married.png' });

            message.channel.send({ embeds: [marryEmbed4], files: [attachment] })
        }
    }
}
