const Discord = require('discord.js');
const userQuestModel = require('../../database/models/userDataJob/userGiaoHangModel');
const emoji= require("../../emoji.json");

module.exports = {
    name: "giaohang",
    aliases: ["gh"],
    description: "Giao vật phẩm",
    cooldowns: 5,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
    */
    run: async (client, message, args) => {
        const author = message.author;
        const id = args[0];
        const userQuest = await userQuestModel.findOne({ userId: author.id });
        
        const idJsonObj = {
            "01": "banhMi",
            "02": "botMi",
            "03": "trung",
            "04": "shushi",
            "05": "thitHeo",
            "06": "banhKem",
            "07": "banhBi",
            "08": "sua",
            "09": "butter",
            "10": "caDongHop",
            "11": "lua",
            "12": "hatDau",
            "13": "bi",
            "14": "caRot",
            "15": "khoaiTay",
            "16": "duaHau",
        }

        const idObj = {
            "01": "bánh mì",
            "02": "bột mì",
            "03": "trứng",
            "04": "shushi",
            "05": "thịt heo",
            "06": "bánh kem",
            "07": "bánh bí",
            "08": "sữa",
            "09": "bơ",
            "10": "cá đóng hộp",
            "11": "lúa",
            "12": "hạt đậu",
            "13": "bí",
            "14": "cà rốt",
            "15": "khoai tây",
            "16": "dưa hấu",
        }

        if (!id || typeof idObj[id] === "undefined") return message.reply(`${emoji.fail} Bạn nhập id sai.\nCách dùng lệnh:\n- Để giao hàng: **\`nqg giaohang <id của quest>\`**\n- Xem quest của mình: **\`nqg quest\`**`);

        const typeQuest = userQuest.giaohang[idJsonObj[id]]

        const isEnable = typeQuest.enable;
        if (!isEnable) 
            return message.reply(`${emoji.fail} Bạn đang không có quest này!`);
        if (typeQuest.isCompleted) return message.reply(`${emoji.fail} Bạn đã hoàn thành nhiệm vụ này rồi!`);
        
        const giaoHang = async(client, authorId, message) => {
            if (soLuong >= typeQuest.requirement) {
                typeQuest.isCompleted = true;
                await userQuest.save();
                let a = message.reply("Đang vận chuyển...<a:duckwaddle:1181621079521894455>  <a:duckwaddle:1181621079521894455>  <a:duckwaddle:1181621079521894455>  <a:duckwaddle:1181621079521894455>  <a:duckwaddle:1181621079521894455>");
                await client.addTien(authorId, typeQuest.reward);
                if (nongSanArr.includes(id)) {
                    await client.truNongSan(authorId, idObj[id], typeQuest.requirement);
                } else {
                    await client.truSanPham(authorId, idObj[id], typeQuest.requirement);
                }
                (await a).edit({ content: `${emoji.success} Bạn đã giao hàng thành công.`});
            } 
            else {
                message.reply(`${emoji.fail} Bạn không đủ vật phẩm để giao hàng!`); 
            }
        }

        const nongSanArr = ["11", "12", "13", "14", "15", "16"];
        let soLuong;
        
        if (nongSanArr.includes(id)) {
            soLuong = await client.nongSan(author.id, idObj[id]);
            await giaoHang(client, author.id, message);
        }
        else {
            soLuong = await client.sanPham(author.id, idObj[id]);
            await giaoHang(client, author.id, message);
        }
    }
}