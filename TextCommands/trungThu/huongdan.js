const Discord = require('discord.js');

module.exports = {
    name: 'hd',
    cooldown: 5,

    run: async(client, message, args) => {
        const embed = new Discord.EmbedBuilder()
            .setTitle('HƯỚNG DẪN CÁC LỆNH EVENT TRUNG THU')
            .setDescription(`
            <:chamvang:1125863859740225556> **Trồng cây:** \`nqg trongcay <lua/bi/dau> <số lượng>\`
            <:chamvang:1125863859740225556> **Cho gà, bò ăn:** \`nqg choan <bo/ga> <số lượng>\`
            <:chamvang:1125863859740225556> **Xem thông tin nông trại của mình:** \`nqg farm\`
            
            **=> Sau 3 giờ cho ăn hoặc trồng cây thì mới thu hoạch được.**
            **Lưu ý: 1 cây trồng sẽ tốn 1 slot đất. **

            <:chamvang:1125863859740225556> **Mua đất trồng cây:** \`nqg muadat <số lượng>\` 
            <:chamvang:1125863859740225556> **Thu hoạch cây trồng:** \`nqg thuhoach <lua/dau/bi>\`
            <:chamvang:1125863859740225556> **Vắt sữa bò:** \`nqg vatsua\` 
            <:chamvang:1125863859740225556> **Thu thập trứng gà:** \`nqg laytrung\` 
            <:chamvang:1125863859740225556> **Shop:** \`nqg shoptt\`
            <:chamvang:1125863859740225556> **Mua vật phẩm Trung Thu:** \`nqg buytt <id/tên> <soLuong>\`
            <:chamvang:1125863859740225556> **Túi đồ Trung Thu:** \`nqg invtt\`
            <:chamvang:1125863859740225556> **Mua quà để tặng người yêu tại \`nqg shoptt\` trang 4**
            <:chamvang:1125863859740225556> **Tặng quà Trung Thu cho người yêu:** \`nqg tangqua @user <id> <soLuong>\`
            <:chamvang:1125863859740225556> **Xem nguyên liệu làm bánh Trung Thu: \`nqg nl <dauxanh/thapcam>\`** 
            <:chamvang:1125863859740225556> **Làm nguyên liệu: \`nqg doinl <id> <số lượng>\`** 
            <:chamvang:1125863859740225556> **Giờ đây bạn có thể trade với người khác bằng lệnh \`nqg trade @user <id> <số lượng> <tiền>\`. Lưu ý chỉ trade được những vật phẩm ở \`nqg invtt\` trang 3 và các nông sản như lúa, bí, đậu
            
            <:chamvang:1125863859740225556> **Điểm level của từng món quà Trung Thu như sau:** 
            > Lồng đèn: 150đ

            > Thỏ bông: 200đ

            > Thỏ cung trăng: 250đ
            `)
        .setTimestamp()
        message.reply({ embeds: [embed] });
    }
}