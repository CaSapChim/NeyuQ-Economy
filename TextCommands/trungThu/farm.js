const Discord = require('discord.js');

module.exports = {
    name: 'farm',
    run: async (client, message, args) => {
        const author = message.author.id;
        const soLuongLua = await client.plant(author, "hạt lúa");
        const soLuongDau = await client.plant(author, "hạt đậu");
        const soLuongBi = await client.plant(author, "hạt bí");
        const soLuongBo = await client.xemAnimal(author, "con bò");
        const soLuongGa = await client.xemAnimal(author, "con gà");
        const soLuongDat = await client.xemDat(author); 
        
        const embed = new Discord.EmbedBuilder()
            .setTitle(':star2: Thông tin nông trại của bạn :star2:')
            .setDescription(`
            <:hand_with_plant:1155701041329872978> Số lượng đất còn dư: ${soLuongDat}
            <:LC_Wheat:1155701062670504037> Lúa: ${soLuongLua}
            <:daunh_1:1156608655060381760> Đậu: ${soLuongDau}
            <:mc_carved_pumpkin45:1155704587462922272> Bí: ${soLuongBi}
            <:Chicken17:1156557573219168307> Gà: ${soLuongGa}
            <:3331_minecraft_cow:1156555169396428830> Bò: ${soLuongBo}
            `)
            .setTimestamp()
            .setColor('Green')
        message.reply({ embeds: [embed] });
    }   
}