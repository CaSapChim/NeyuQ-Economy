const Discord = require('discord.js');
const emoji = require('../../emoji.json');
const plantModel = require('../../database/models/userDataJob/plantModel');
const trackingTuoiCayModel = require('../../database/models/trackingTuoiCayModel');

module.exports = {
    name: 'farm',
    description: "Xem thông tin trang trại của mình",
    adminOnly: false,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async (client, message, args) => {
        const author = message.author.id;

        function u(plant, time) {
            return (plant > 0 && time == ` `) ? `${emoji.success}` : `<a:xo_cross:1166752009840500857>`;
        }
        
        async function a(plant, name) {
            let data = await plantModel.findOne({ userId: author, plantName: name });
            if (!data)
                data = new plantModel({ userId: author, plantName: name});
            await data.save();
            const currentDate = Date.now();
            const elapsedMillis = currentDate - data.timeTuoi;
            return (plant > 0 && elapsedMillis > 3 * 60 * 1000 && data.canHarvest == false) ? "💧" : "";
        }
        
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
            timeHeo,
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
        ]);
        
        const [
            tuoiCayLua,
            tuoiCayDau,
            tuoiCayBi,
            tuoiCayDuaHau,
            tuoiCayKhoaiTay,
            tuoiCayCaRot,
        ] = await Promise.all([
            a(soLuongLua, "hạt lúa"),
            a(soLuongDau, "hạt đậu"),
            a(soLuongBi, "hạt bí"),
            a(soLuongDuaHau, "hạt dưa hấu"),
            a(soLuongKhoaiTay, "khoai tây"),
            a(soLuongCaRot, "cà rốt")
        ])

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
                ${u(soLuongLua, timeLua)} | **\`250\`** | <:LC_Wheat:1155701062670504037> Lúa: ${soLuongLua} ${timeLua} ${tuoiCayLua}
                ${u(soLuongDau, timeDau)} | **\`251\`** | <:daunh_1:1156608655060381760> Đậu: ${soLuongDau} ${timeDau} ${tuoiCayDau}
                ${u(soLuongBi, timeBi)} | **\`252\`** | <:mc_carved_pumpkin45:1155704587462922272> Bí: ${soLuongBi} ${timeBi} ${tuoiCayBi}
                ${u(soLuongDuaHau, timeDuaHau)} | **\`253\`** | <:Melon8:1166407706496733284> Dưa hấu: ${soLuongDuaHau} ${timeDuaHau} ${tuoiCayDuaHau}
                ${u(soLuongKhoaiTay, timeKhoaiTay)} | **\`254\`** | <:potato45:1166650017264705547> Khoai tây: ${soLuongKhoaiTay} ${timeKhoaiTay} ${tuoiCayKhoaiTay}
                ${u(soLuongCaRot, timeCaRot)} | **\`255\`** | <:Carrot29:1166650013603090432> Cà rốt: ${soLuongCaRot} ${timeCaRot} ${tuoiCayCaRot}
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
                .setLabel("TƯỚI CÂY")
                .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
                .setCustomId("thuhoach")
                .setLabel("THU HOẠCH")
                .setStyle(Discord.ButtonStyle.Success)
        )

        let duma = await message.reply({ embeds: [embed], components: [btnRow] });
        var collector = duma.createMessageComponentCollector({
            filter: interaction => 
                interaction.isButton() && interaction.message.author.id == client.user.id,
                time: 60000
        })

        collector.on("collect", async (interaction) => {
            if (interaction.user.id !== message.author.id) {
                return interaction.reply({ content: "Nút này không dành cho bạn", ephemeral: true });
            }
        
            let data = await plantModel.find({ userId: interaction.user.id });
            if (interaction.customId === "tuoicay") {
                const currentDate = Date.now();
                let count = 0;
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        const elapsedMillis = currentDate - data[i].timeTuoi;
                        if (data[i].soLuongPlanted > 0 && elapsedMillis > 3 * 60 * 1000 && data[i].planted == true) {
                            count++;
                            data[i].plantedAt -= 2 * 60 * 1000;
                            data[i].timeTuoi = Date.now();
                            data[i].save();
                        }
                    }
                    if (count > 0) {
                        interaction.reply({ content: `<:420_feed_plants:1178589527477080154> Bạn đã tưới **${count}** cây thành công và giảm **2 phút** tăng trưởng của cây!\nHẹn bạn sau **3 phút** nữa!`, ephemeral: true });
                        let dataTuoiCay = await trackingTuoiCayModel.findOne({
                            userId: interaction.user.id
                          })
                      
                          if (!dataTuoiCay) {
                            dataTuoiCay = new trackingTuoiCayModel({
                                userId: interaction.user.id,
                            })
                          }
                          await dataTuoiCay.save()
                          
                          if (dataTuoiCay.enable == true) {
                            setTimeout(() => {
                              message.reply(`${dataTuoiCay.text.length === 0 ? `\`Tưới cây đi\`` : dataTuoiCay.text}`)
                            }, 15000);
                          }
                    }
                    else
                        interaction.reply({ content: `Hiện tại chưa có cây nào cần tưới nước`, ephemeral: true });
                } else {
                    interaction.reply({ content: "Bạn chưa trồng cây nào!", ephemeral: true });
                }
            } else {
                if (data) {
                    const hatToCayObj = {
                        "hạt lúa": "lúa",
                        "hạt đậu": "hạt đậu",
                        "hạt bí": "bí",
                        "hạt dưa hấu": "dưa hấu",
                        "khoai tây": "khoai tây",
                        "cà rốt": "cà rốt",
                    }

                    const idHatToEmojiCay = {
                        "hạt lúa": "<:LC_Wheat:1155701062670504037>",
                        "hạt đậu": "<:daunh_1:1156608655060381760>",
                        "hạt bí": "<:mc_carved_pumpkin45:1155704587462922272>",
                        "hạt dưa hấu": "<:Melon8:1166407706496733284>",
                        "khoai tây": "<:potato45:1166650017264705547>",
                        "cà rốt": "<:Carrot29:1166650013603090432>",
                    }

                    let msg = ``;
                    let count = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].soLuongPlanted > 0 && data[i].planted && data[i].canHarvest) {
                            count++;
                            let result = data[i].soLuongPlanted * 2;
                            await client.thuHoach(interaction.user.id, data[i].plantName);
                            await client.addNongSan(interaction.user.id, hatToCayObj[data[i].plantName], result);    
                            await client.addDat(interaction.user.id, data[i].soLuongPlanted);
                            msg += `${result} ${idHatToEmojiCay[data[i].plantName]}\n`;
                        }
                    }
                    if (count > 0)
                        interaction.reply({ content: `**Bạn đã thu hoạch thành công:**\n${msg}`, ephemeral: true });
                    else
                        interaction.reply({ content: "Bạn chưa trồng cây nào hoặc là cây chưa lớn.", ephemeral: true });
                }
            }
        });

        collector.on("end", () => {
            btnRow.components[0].setDisabled(true);
            btnRow.components[1].setDisabled(true);
            embed.setColor("Grey")
            duma.edit({ embeds: [embed], components: [btnRow], content: `Tin nhắn đã hết hiệu lực.` });
        })
    }   
}