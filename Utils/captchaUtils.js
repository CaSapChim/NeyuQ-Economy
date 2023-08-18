const Captcha = async (client, message) => {
    if (message.author.bot || !message.content) return;
    const user = message.author

    const Canvas = require('canvas');
    const Discord = require('discord.js');
    const verifiedModel = require('../database/models/verifiedModel')

    let limit = 100
    const a = Math.floor(Math.random() * 500)
    const b = Math.floor(Math.random() * 500)

    if ( a + b < limit) {
        const captchaArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        const captchaLength = captchaArr.length;
    
        const canvasWidth = 200;
        const canvasHeight = 70;
    
        const canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
        let context = canvas.getContext('2d');
    
        let result = [];
    
        for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * captchaLength);
        let sDeg = (Math.random() * 30 * Math.PI) / 180;
        let cTxt = captchaArr[index];
        result[i] = cTxt.toLowerCase();
        let x = 10 + i * 20;
        let y = 20 + Math.random() * 8;
        context.font = 'bold 23px noto';
        context.translate(x, y);
        context.rotate(sDeg);
    
        let color = randomColor();
        context.fillStyle = color;
        context.strokeStyle = color;
    
        context.fillText(cTxt, 0, 0);
    
        context.rotate(-sDeg);
        context.translate(-x, -y);
        }
    
        for (let i = 0; i <= 4; i++) {
        context.beginPath();
        context.moveTo(
            Math.random() * canvasWidth,
            Math.random() * canvasHeight
        );
        context.lineTo(
            Math.random() * canvasWidth,
            Math.random() * canvasHeight
        );
        context.stroke();
        }
    
        for (let i = 0; i < 30; i++) {
        context.beginPath();
        let x = Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
        }
    
        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name:'captcha.png' });
        const content = result.join('');
        
        let verifyData = await verifiedModel.findOne({
            userId: message.author.id
        })

        try {
            const dmChannel = await user.createDM();
            await dmChannel.send({
                files: [attachment],
                content: `**<@${message.author.id}>, bạn có phải là con người không?\nBạn có 5 phút để nhập đúng mã captcha bên dưới.**`
            });

            const filter = m => m.author.id === message.author.id && m.content.toLowerCase().trim().slice(-6) === result.join('').trim();
            const collector = dmChannel.createMessageCollector({ filter, time: 300000 });
            
            if (!verifyData) {
                verifyData = new verifiedModel({ userId: message.author.id })
            }
            await verifyData.save()
            collector.on('collect', async m => {
                if (m.content.toLowerCase() == content) {
                    await m.reply(`**Cảm ơn bạn đã xác nhận! Bạn có thể tiếp tục sử dụng bot.**`);
                    await verifiedModel.deleteOne({ userId: message.author.id })
                    collector.stop();
                } 
            });
    
            collector.on('end', async collected => {
                if (collected.size < 1) {
                    await client.addWarn(message.author.id, message.author.username, 1)
                    let data = await client.warn(message.author.id)
                    await verifiedModel.deleteOne({ userId: message.author.id })
                    await dmChannel.send(`**<@${message.author.id}>, đã trôi qua 5 phút, bạn đã bị nhận \`${data}\` lần cảnh cáo\nBạn còn ${3 - data} lần nữa sẽ bị BAN**`)
                    if ( data >= 3 ) {
                        await client.ban(message.author.id, message.author.username)   
                        await dmChannel.send(`**<@${message.author.id}>, đã 3 lần nhận cảnh cáo, bạn đã bị BAN vì sử dụng phần mềm thứ ba! Hãy liên hệ Cá hoặc Hàu để được xem xét gỡ ban!**`);
                        await verifiedModel.deleteOne({ userId: message.author.id })
                    } 
                }
            });
        } catch (error) {
            console.error('Lỗi ko gửi được captcha:', error);
            try {
                await message.channel.send({
                    files: [attachment],
                    content: `**<@${message.author.id}>, bạn có phải là con người không?\nBạn có 5 phút để nhập đúng mã captcha bên dưới.**`
                    });
                
                    const filter = m => m.author.id === message.author.id && m.content.toLowerCase().trim().slice(-6) === result.join('').trim();
                    const collector = message.channel.createMessageCollector({ filter, time: 300000 });
                
                    collector.on('collect', async m => {
                    if (m.content.toLowerCase() == content) {
                        await m.reply(`**Cảm ơn bạn đã xác nhận! Bạn có thể tiếp tục sử dụng bot.**`);
                        await verifiedModel.deleteOne({ userId: message.author.id })
                        collector.stop()
                    }
                    });
                
                    collector.on('end', async collected => {
                        if (collected.size < 1) {
                            await client.addWarn(message.author.id, message.author.username)
                            let data = await client.warn(message.author.id)
                            await verifiedModel.deleteOne({ userId: message.author.id })
                            await message.channel.send(`**<@${message.author.id}>, đã trôi qua 5 phút, bạn đã bị nhận \`${data}\` lần cảnh cáo\nBạn còn ${3 - data} nữa sẽ bị BAN**`)
                            if ( data >= 3 ) {
                                await client.ban(message.author.id, message.author.username)   
                                await message.channel.send(`**<@${message.author.id}>, đã 3 lần nhận \`warn\` , bạn đã bị BAN vì sử dụng phần mềm thứ ba! Hãy liên hệ Cá hoặc Hàu để được xem xét gỡ ban!**`);
                                await verifiedModel.deleteOne({ userId: message.author.id })
                            } 
                        }
                    });
            } catch(err) {
                console.log('Lỗi captcha:', err)
            }
        }

        function randomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
        }
    }
  };
  
  module.exports = {
    Captcha
  };