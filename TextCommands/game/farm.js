const Discord = require('discord.js');
const emoji = require('../../emoji.json');

module.exports = {
    name: 'farm',
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async (client, message, args) => {
        const author = message.author.id;

        
        const [
            soLuongLua,
            soLuongDau,
            soLuongBi,
            soLuongDuaHau,
            soLuongKhoaiTay,
            soLuongCaRot,
            soLuongBo,
            soLuongGa,
            soLuongHeo,
            soLuongDat,
            tongBo,
            tongGa,
            tongHeo,
            timeLua,
            timeDau,
            timeBi,
            timeDuaHau,
            timeKhoaiTay,
            timeCaRot,
            timeBo,
            timeGa,
            timeHeo
        ] = await Promise.all([
            client.plant(author, "hạt lúa"),
            client.plant(author, "hạt đậu"),
            client.plant(author, "hạt bí"),
            client.plant(author, "hạt dưa hấu"),
            client.plant(author, "khoai tây"),
            client.plant(author, "cà rốt"),
            client.animalFed(author, "bò"),
            client.animalFed(author, "gà"),
            client.animalFed(author, "heo"),
            client.xemDat(author), 
            client.xemAnimal(author, "bò"),
            client.xemAnimal(author, "gà"),
            client.xemAnimal(author, "heo"),
            client.checkTimePlant(author, "hạt lúa"),
            client.checkTimePlant(author, "hạt đậu"),
            client.checkTimePlant(author, "hạt bí"),
            client.checkTimePlant(author, "hạt dưa hấu"),
            client.checkTimePlant(author, "khoai tây"),
            client.checkTimePlant(author, "cà rốt"),
            client.checkTimeAnimal(author, "bò"),
            client.checkTimeAnimal(author, "gà"),
            client.checkTimeAnimal(author, "heo"),
        ])

        function u(plant, time) {
            return (plant > 0 && time == ` `) ? `${emoji.success}` : `<a:xo_cross:1166752009840500857>`;
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
                ${u(soLuongLua, timeLua)} | **\`250\`** | <:LC_Wheat:1155701062670504037> Lúa: ${soLuongLua} ${timeLua}
                ${u(soLuongDau, timeDau)} | **\`251\`** | <:daunh_1:1156608655060381760> Đậu: ${soLuongDau} ${timeDau}
                ${u(soLuongBi, timeBi)} | **\`252\`** | <:mc_carved_pumpkin45:1155704587462922272> Bí: ${soLuongBi} ${timeBi}
                ${u(soLuongDuaHau, timeDuaHau)} | **\`253\`** | <:Melon8:1166407706496733284> Dưa hấu: ${soLuongDuaHau} ${timeDuaHau}
                ${u(soLuongKhoaiTay, timeKhoaiTay)} | **\`254\`** | <:potato45:1166650017264705547> Khoai tây: ${soLuongKhoaiTay} ${timeKhoaiTay}
                ${u(soLuongCaRot, timeCaRot)} | **\`255\`** | <:Carrot29:1166650013603090432> Cà rốt: ${soLuongCaRot} ${timeCaRot}
                `, inline: false },
                { name: 'Vật nuôi đã cho ăn', value: `
                ${u(soLuongBo, timeBo)} | **\`bo\`** | <:3331_minecraft_cow:1156555169396428830> Bò: ${soLuongBo} ${timeBo}
                ${u(soLuongGa, timeGa)} | **\`ga\`** | <:Chicken17:1156557573219168307> Gà: ${soLuongGa} ${timeGa}
                ${u(soLuongHeo, timeHeo)} | **\`heo\`** | <:technoblade64:1166408637623844924> Heo: ${soLuongHeo} ${timeHeo}
                `, inline: false }
            )
            .setThumbnail(`https://cdn.discordapp.com/attachments/1080521432032882700/1170699192658841681/6300787.png?ex=6559fd96&is=65478896&hm=8aba6ff76840f4e7841bd77dab6c4066b4556dc7b33f6d1df7c5ff39c0aab7cd&`)
            .setTimestamp();
        
        const btnRow = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('tuoicay')
                .setLabel("Tưới cây")
                .setStyle(Discord.ButtonStyle.Primary)
        )

        let a = await message.reply({ embeds: [embed], components: [btnRow] });
        var collector = a.createMessageComponentCollector({
            filter: interaction => 
                interaction.isButton() && interaction.message.author.id == client.user.id,
                time: 5000
        })
        
        collector.on("collect", async interaction => {
            if (interaction.user.id != message.author.id) return interaction.reply({ content: `Nút này không dành cho bạn`, ephemeral: true});
            if (interaction.customId === "tuoicay") {
                const time = 15 * 60 * 1000; // đổi sang mili giây
                const timeDaTuoi = await client.checkTimeTuoiCay(interaction.user.id);
                const hours = timeDaTuoi.getHours();
                
                if (typeof timeDaTuoi == null) {
                    
                }
                else {
                    const remainingTimeTuoiCay = timeDaTuoi - time;
                }
                await client.tuoiCay(interaction.user.id);
                interaction.reply({ content: `Bạn đã tưới cây thành công, vui lòng quay lại sau...`});
            }
        })
    }   
}
