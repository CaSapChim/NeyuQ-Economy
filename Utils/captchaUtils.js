const Captcha = async (client, message) => {
    if (message.author.bot || !message.content) return;
  
    const Canvas = require('canvas');
    const Discord = require('discord.js');

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
        context.font = 'bold 23px';
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
    
        await message.channel.send({
        files: [attachment],
        content: `**<@${message.author.id}>, bạn có phải là con người không?\nBạn có 1 phút để nhập đúng mã captcha bên dưới.**`
        });
    
        const filter = m => m.author.id === message.author.id && m.content.toLowerCase().trim().slice(-6) === result.join('').trim();
        const collector = message.channel.createMessageCollector({ filter, time: 60000 });
    
        collector.on('collect', async m => {
        if (m.content.toLowerCase() == content) {
            await m.reply(`**Cảm ơn bạn đã xác nhận! Bạn có thể tiếp tục sử dụng bot.**`);
            collector.stop()
        }
        });
    
        collector.on('end', async collected => {
            if (collected.size < 1) {
                await message.channel.send(`**<@${message.author.id}>, đã trôi qua 1 phút, bạn đã bị BAN vì sử dụng phần mềm thứ ba! Hãy liên hệ ... để được xem xét gỡ ban!**`);        
            }
        });
    
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