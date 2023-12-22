const Discord = require('discord.js');
const emoji = require('../../emoji.json');
const data = require("../../data/sell.json");

module.exports = {
    name: 'sell',
    cooldown: 3,
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @returns 
     */
    run: async(client, message, args) => {
        let type = args[0];
        let id = args[1]
        let amount = args[2];
        if (!type || !id || !amount) return message.reply("Cách dùng: **`nqg sell <ks/nhan> <id/tên> <số lượng/all>`**\nVí dụ: **nqg sell ks than 100**");
        const author = message.author;

        const emojiKS = {
            "Than": "<:905609870114439208:1134500336862765138>",
            "Sắt": "<:842601384561868810:1134500649548124161>",
            "Vàng": "<:905609869485289482:1134500596871868588>",
            "Kim cương": "<:943215979935187074:1134500706095743150>",
            "Ngọc lục bảo": "<:905609867769839637:1134500619898593380>",
            "titan": "<:diamond92:1179255142651011122>",
            "saphir": "<:sapphire_gem:1179255149043134464>",
            "ametit": "<:DiamondPurple:1179255138276356207>",
            "ruby": "<:gem_ruby83:1179255146643988500>",
        }

        const nameKS = {
            "than": "Than",
            "230": "Than",
            "sat": "Sắt",
            "231": "Sắt",
            "vang": "Vàng",
            "232": "Vàng",
            "kimcuong": "Kim cương",
            "kc": "Kim cương",
            "233": "Ngọc lục bảo",
            "nlb": "Ngọc lục bảo",
            "ngoclucbao": "Ngọc lục bảo",
            "234": "Ngọc lục bảo",
            "titan": "titan",
            "235": "titan",
            "ametit": "ametit",
            "236": "ametit",
            "saphir": "saphir",
            "237": "saphir",
            "ruby": "ruby",
            "238": "ruby",
        }

        const priceKS = {
            "than": data.than,
            "230": data.than,
            "sat": data.sat,
            "231": data.sat,
            "vang": data.vang,
            "232": data.vang,
            "kimcuong": data.kimcuong,
            "kc": data.kimcuong,
            "233": data.ngoclucbao,
            "nlb": data.ngoclucbao,
            "ngoclucbao": data.ngoclucbao,
            "234": data.ngoclucbao,
            "titan": data.titan,
            "235": data.titan,
            "ametit": data.ametit,
            "236": data.ametit,
            "saphir": data.saphir,
            "237": data.saphir,
            "ruby": data.ruby,
            "238": data.ruby,
        }

        const nameNhan = {
            "110": 'Nhẫn bạc',
            "111": 'Nhẫn vàng',
            "112": 'Nhẫn hồng'
        }

        const priceNhan = {
            "110": data.nhanbac,
            "111": data.nhanvang,
            "112": data.nhanhong
        }
        
        if (amount < 0 || (isNaN(amount) && amount !== "all".toLowerCase())) 
            return message.reply(`${emoji.fail} Phắc du <@${author.id}> sai định dạng rồi`)
            .then(msg => setTimeout(() => {
                msg.delete();
            }, 5000));

        const getKSInfo = async (authorId, price, itemName) => {
            let ks = await client.khoangsan(authorId, itemName);
            if (amount === "all".toLowerCase()) amount = ks;

            if (ks - parseInt(amount) < 0) return message.reply(`${emoji.fail} Bạn không đủ **${nameKS[id]}**để bán.`);
            
            await client.truKS(authorId, itemName, amount)
            await client.addTien(authorId, price * amount)

            await message.reply(`${emoji.success} **|** Đã bán thành công **${amount} ${emojiKS[itemName]}** với giá **${(price * amount).toLocaleString("En-Us")} <:O_o:1135831601205481523> coins**`)
        }   

        if (type === "ks".toLowerCase()) {
            getKSInfo(author.id, priceKS[id], nameKS[id]);
        } 
        else if (type === "nhan".toLowerCase()) {
            getItemInfo(priceNhan[id], nameNhan[id]);
        }

        const getItemInfo = async (price, itemName) => {
            let item = await client.item(author.id, itemName);
            if (amount == "all") amount = item;
            if (item > 0) {
                await client.truItem(author.id, itemName, amount)
                await client.addTien(author.id, price)
                return message.reply(`${emoji.success} Bạn đã bán thành công **${itemName}** với giá **${price.toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`)
            } else {
                return message.reply(`${emoji.fail} Bạn không có **${itemName}** nào để bán!`)
            }
        }
    }
}