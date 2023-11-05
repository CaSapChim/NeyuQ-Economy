const Discord = require('discord.js');
const emoji = require('../../emoji.json');

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
        const soLuongDuaHau = await client.plant(author, "hạt dưa hấu");
        const soLuongKhoaiTay = await client.plant(author, "khoai tây");
        const soLuongCaRot = await client.plant(author, "cà rốt");
        //const soLuongBo = await client.animalFed(author, "bò");
        //const soLuongGa = await client.animalFed(author, "gà");
        //const soLuongHeo = await client.animalFed(author, "heo");
        const soLuongDat = await client.xemDat(author); 

        const tongBo = await client.xemAnimal(author, "bò");
        const tongGa = await client.xemAnimal(author, "gà");
        const tongHeo = await client.xemAnimal(author, "heo");

        const timeLua = await client.checkTimePlant(author, "hạt lúa");
        const timeDau = await client.checkTimePlant(author, "hạt đậu");
        const timeBi = await client.checkTimePlant(author, "hạt bí");
        const timeDuaHau = await client.checkTimePlant(author, "hạt dưa hấu");
        const timeKhoaiTay = await client.checkTimePlant(author, "khoai tây");
        const timeCaRot = await client.checkTimePlant(author, "cà rốt");
        //const timeBo = await client.checkTimeAnimal(author, "con bò");
        //const timeGa = await client.checkTimeAnimal(author, "con gà");

        function u(plant, time) {
            if (plant > 0 && time == ` `) 
                return `${emoji.success}`;
            else   
                return `<a:xo_cross:1166752009840500857>`;
        }

        const embed = new Discord.EmbedBuilder()
            .setTitle('Thành phần nông trại của bạn')
            .setDescription(`
            > <:hand_with_plant:1155701041329872978> Số lượng đất còn dư: ${soLuongDat}
            
            > <:3331_minecraft_cow:1156555169396428830> Tổng số bò chưa cho ăn: ${tongBo}

            > <:Chicken17:1156557573219168307> Tổng số gà chưa cho ăn: ${tongGa}

            > <:technoblade64:1166408637623844924> Tổng số heo chưa cho ăn: ${tongHeo} 
            `)
            .setColor('Green')
            .addFields(
                { name: 'Cây trồng', value: `
                ${u(soLuongLua, timeLua)} | <:LC_Wheat:1155701062670504037> Lúa: ${soLuongLua} ${timeLua}
                ${u(soLuongDau, timeDau)} | <:daunh_1:1156608655060381760> Đậu: ${soLuongDau} ${timeDau}
                ${u(soLuongBi, timeBi)} | <:mc_carved_pumpkin45:1155704587462922272> Bí: ${soLuongBi} ${timeBi}
                ${u(soLuongDuaHau, timeDuaHau)} | <:Melon8:1166407706496733284> Dưa hấu: ${soLuongDuaHau} ${timeDuaHau}
                ${u(soLuongKhoaiTay, timeKhoaiTay)} | <:potato45:1166650017264705547> Khoai tây: ${soLuongKhoaiTay} ${timeKhoaiTay}
                ${u(soLuongCaRot, timeCaRot)} | <:Carrot29:1166650013603090432> Cà rốt: ${soLuongCaRot} ${timeCaRot}
                `, inline: false },
                // { name: 'Vật nuôi đã cho ăn', value: `
                // <:3331_minecraft_cow:1156555169396428830> Bò: ${soLuongBo} - ${timeBo}
                // <:Chicken17:1156557573219168307> Gà: ${soLuongGa} - ${timeGa}
                // `, inline: false }
            )
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }   
}