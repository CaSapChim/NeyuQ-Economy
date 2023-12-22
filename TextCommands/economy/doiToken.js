const axios = require('axios');
const Discord = require("discord.js");
const emoji = require("../../emoji.json");
const apiKey = require("../../dontPushMe/config.json").API_KEY_MGDB_VET;

module.exports = {
    name: "doivcoin",
    aliases: ["doivc"],
    description: "Đổi tiền nqg coins sang vcoin của bot <@1140305763215093842>",
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const toToken = parseInt(args[0]);

        var data = JSON.stringify({
            "collection": "balances",
            "database": "Levels",
            "dataSource": "ClusterDiscord",
            "filter": {
                "userId": `${message.author.id}`,
            },
            "update": {
                "$inc": {
                    "money": toToken
                }
            }
        });
                    
        var config = {
            method: 'post',
            url: 'https://data.mongodb-api.com/app/data-dyjfa/endpoint/data/v1/action/updateOne',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Request-Headers': '*',
              'api-key': apiKey,
            },
            data: data
        };

        const tiGia = 100;
                    
        const userBal = await client.xemTien(message.author.id);
        if (tiGia * toToken > userBal) return message.reply(`${emoji.fail} Bạn không đủ tiền để đổi sang vcoins`);
        const a = message.reply("<a:Loading:1181525113435336754>");
        axios(config)
            .then(async () => {
                (await a).edit(`${emoji.success} Đổi thành công **${tiGia * toToken}** ${emoji.coin} nqg coins sang **${toToken}** <:Token:1181904336381562961> vcoins`);
                await client.truTien(message.author.id, tiGia * toToken);
            })
            .catch(err => {
                console.log(err);
        });
    }
}