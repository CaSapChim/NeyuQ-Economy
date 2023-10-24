const Discord = require('discord.js');
const scoreTTModel = require('../../database/models/eventTrungThu/scoreTTModel');

module.exports = {
    name: 'doinl',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let typeId = parseInt(args[0]);
        let soLuong = parseInt(args[1]) || 1;
        if (isNaN(typeId) && isNaN(soLuong)) return;
        if (!typeId) return message.reply('`nqg doinl <id> <số lượng>`');
        
        const author = message.author.id;
        let scoreData = await scoreTTModel.findOne({ userId: author });
        if (!scoreData) scoreData = new scoreTTModel({ userId: author });
        await scoreData.save();

        const lua = await client.nongSan(author, "lúa");
        const dau = await client.nongSan(author, "đậu");
        const bi = await client.nongSan(author, "bí");
        const trung = await client.nongSan(author, "trứng");
        const sua = await client.nongSan(author, "sữa");
        const botMi = await client.nongSan(author, "bột mì");
        const nhanDauXanh = await client.nongSan(author, "nhân đậu xanh");
        const botBanhDauXanh = await client.nongSan(author, "bột bánh đậu xanh");
        const nhanThapCam = await client.nongSan(author, "nhân thập cẩm");
        const botBanhThapCam = await client.nongSan(author, "bột bánh thập cẩm");
        const lapXuong = await client.nongSan(author, "lạp xưởng");
        const bo = await client.nongSan(author, "bơ");

        if (typeId == 202) {
            if (lua < soLuong) return message.reply(`Bạn không đủ **${soLuong}** <:LC_Wheat:1155701062670504037> để làm.`);
            await client.addNongSan(author, "bột mì", soLuong);
            await client.truNongSan(author, "lúa", soLuong);
            message.reply(`Bạn đã sản xuất thành công **${soLuong}** <:6289_flour:1155701022891704360>.`);
        } 
        else if(typeId == 203) {
            if (botMi < 16 || trung < 16 || sua < 16 || bo < 5) return message.reply(`Bạn không đủ <:eje_minecraft_milk:1156555171493597204>, <:Minecraft_Egg:1156555165189550101>, <:6289_flour:1155701022891704360> <:butter:1157312769234845736> để làm bột bánh đậu xanh.`);
            await client.addNongSan(author, "bột bánh đậu xanh", soLuong);
            await client.truNongSan(author, "trứng", soLuong * 16);
            await client.truNongSan(author, "sữa", soLuong * 16);
            await client.truNongSan(author, "bơ", soLuong * 5);
            await client.truNongSan(author, "bột mì", soLuong * 16);
            message.reply(`Bạn đã sản xuất thành công **${soLuong} bột bánh đậu xanh** <:botxanhremovebgpreview:1156914386917671032>`);
        }
        else if(typeId == 204) {
            if (botMi < 16 || trung < 16 || sua < 16 || bo < 5) return message.reply(`Bạn không đủ <:eje_minecraft_milk:1156555171493597204>, <:Minecraft_Egg:1156555165189550101>, <:6289_flour:1155701022891704360> <:butter:1157312769234845736> để làm bột bánh thập cẩm.`);
            await client.addNongSan(author, "bột bánh thập cẩm", soLuong);
            await client.truNongSan(author, "trứng", soLuong * 16);
            await client.truNongSan(author, "sữa", soLuong * 16);
            await client.truNongSan(author, "bơ", soLuong * 5);
            await client.truNongSan(author, "bột mì", soLuong * 16);
            message.reply(`Bạn đã sản xuất thành công **${soLuong} bột bánh thập cẩm** <:botBanhThapCAm:1157333983374364682>`);
        }
        else if (typeId == 205) {
            if (dau < 16 || sua < 8) return message.reply(`Bạn không đủ <:eje_minecraft_milk:1156555171493597204>, <:daunh_1:1156608655060381760> để làm nhân bánh đậu xanh`);
            await client.addNongSan(author, "nhân đậu xanh", soLuong);
            await client.truNongSan(author, "đậu", soLuong * 16);
            await client.truNongSan(author, "sữa", soLuong * 8);
            message.reply(`Bạn đã sản xuất thành công **${soLuong} nhân bánh đậu xanh** <:botxanh2removebgpreview:1156915468267946004>`);
        }
        else if (typeId == 206) {
            if (trung < 8 || bi < 8 < lapXuong < 16) return message.reply(`Bạn không đủ <:Minecraft_Egg:1156555165189550101>, <:mc_carved_pumpkin45:1155704587462922272>, <:lapXuongTT:1157319283341283348> để làm nhân thập cẩm.`);
            await client.addNongSan(author, "nhân thập cẩm", soLuong);
            await client.truNongSan(author, "bí", soLuong * 8);
            await client.truNongSan(author, "trứng", soLuong * 8);
            await client.truNongSan(author, "lạp xưởng", soLuong * 16);
            message.reply(`Bạn đã sản xuất thành công **${soLuong} nhân bánh thập cẩm** <:botBanhThapCAm:1157113151251292230>`)
        }
        else if (typeId == 207) {
            if (botBanhDauXanh < 1 || nhanDauXanh < 1) return message.reply(`Bạn không đủ <:botxanhremovebgpreview:1156914386917671032> và <:botxanh2removebgpreview:1156915468267946004> để làm bánh trung thu nhân đậu xanh.`);
            await client.addNongSan(author, "bánh trung thu nhân đậu xanh", soLuong);
            await client.truNongSan(author, "nhân đậu xanh", soLuong);
            await client.truNongSan(author, "bột bánh đậu xanh", soLuong);
            message.reply(`Bạn đã sản xuất thành công **${soLuong} bánh trung thu nhân đậu xanh <:banhdauxanh_1:1156609030165377035>**`);
            scoreData.score += 1;
            scoreData.save();
        }
        else if (typeId == 208) {
            if (botBanhThapCam < 1 || nhanThapCam < 1) return message.reply(`Bạn không đủ <:botxanhremovebgpreview:1156914386917671032> và <:botxanh2removebgpreview:1156915468267946004> để làm bánh trung thu nhân đậu xanh.`);
            await client.addNongSan(author, "bánh trung thu nhân thập cẩm", soLuong);
            await client.truNongSan(author, "nhân thập cẩm", soLuong);
            await client.truNongSan(author, "bột bánh thập cẩm", soLuong);
            message.reply(`Bạn đã sản xuất thành công **${soLuong} bánh trung thu nhân đậu xanh <:banhtrungthu_1:1156609035794124870>**`);
            scoreData.score += 1;
            scoreData.save();
        }
        else {
            message.reply(`Lệnh không hợp lệ.\n Cách dùng \`nqg doinl <id> <số lượng>\``);
        }
    }
}