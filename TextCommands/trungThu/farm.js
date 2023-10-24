const Discord = require('discord.js');

module.exports = {
    name: 'farm',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async (client, message, args) => {
        const author = message.author.id;
        const soLuongLua = await client.plant(author, "hạt lúa");
        const soLuongDau = await client.plant(author, "hạt đậu");
        const soLuongBi = await client.plant(author, "hạt bí");
        const soLuongBo = await client.animalFed(author, "con bò");
        const soLuongGa = await client.animalFed(author, "con gà");
        const soLuongDat = await client.xemDat(author); 

        const tongBo = await client.xemAnimal(author, "con bò");
        const tongGa = await client.xemAnimal(author, "con gà");

        const timeLua = await client.checkTimePlant(author, "hạt lúa");
        const timeDau = await client.checkTimePlant(author, "hạt đậu");
        const timeBi = await client.checkTimePlant(author, "hạt bí");
        const timeBo = await client.checkTimeAnimal(author, "con bò");
        const timeGa = await client.checkTimeAnimal(author, "con gà");

        const embed = new Discord.EmbedBuilder()
            .setTitle('Thành phần nông trại của bạn')
            .setDescription(`<:hand_with_plant:1155701041329872978> Số lượng đất còn dư: ${soLuongDat}
            <:3331_minecraft_cow:1156555169396428830> Tổng số bò chưa cho ăn: ${tongBo}
            <:Chicken17:1156557573219168307> Tổng số gà chưa cho ăn: ${tongGa}
            `)
            .setColor('Green')
            .addFields(
                { name: 'Cây trồng', value: `
                <:LC_Wheat:1155701062670504037> Lúa: ${soLuongLua} - ${timeLua}
                <:daunh_1:1156608655060381760> Đậu: ${soLuongDau} - ${timeDau}
                <:mc_carved_pumpkin45:1155704587462922272> Bí: ${soLuongBi} - ${timeBi}
                `, inline: false },
                { name: 'Vật nuôi đã cho ăn', value: `
                <:3331_minecraft_cow:1156555169396428830> Bò: ${soLuongBo} - ${timeBo}
                <:Chicken17:1156557573219168307> Gà: ${soLuongGa} - ${timeGa}
                `, inline: false }
            )
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }   
}