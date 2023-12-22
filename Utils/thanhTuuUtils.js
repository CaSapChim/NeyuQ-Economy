const emoji = require('../emoji.json');
const Discord = require('discord.js');
const thuongThanhTuu = require("../data/thuongThanhTuu.json");

const thanhTuuUtils = async (client, message, name) => {
    const thanhTuuArr = Object.keys(thuongThanhTuu[name]);
    const a = await client.thongKe(message.author.id, name);
    console.log(name);
    const nameObj = {
        "mine": "đào mỏ",
        "cauca": "câu cá",
        "farm": "trồng cây"
    }

    thanhTuuArr.map(async i => {
        if (i == a) {
            message.channel.send(`${emoji.congra} <@${message.author.id}> đã ${nameObj[name]} được ${i} lần và được thưởng **${thuongThanhTuu[name][i]}** ${emoji.token} Tokens`);
            await client.addToken(message.author.id, thuongThanhTuu[name][i]);
        }
    });
};

module.exports = { thanhTuuUtils };