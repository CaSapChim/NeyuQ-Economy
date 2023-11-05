const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "shop",
  description: "Xem danh sách các lệnh của bot",
  aliases: ["cuahang", "store"],
  cooldown: 5,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {*} args 
   * @param {*} userData 
   * @returns 
   */
  run: async (client, message, args, userData) => {
    let type = args[0];
    if (!type) return message.reply("**Cách dùng: `nqg shop <taphoa/tool/farm>`**")
    if (type == 'taphoa') {
        const hoaEmbed = new EmbedBuilder()
        .setTitle("QUẦY BÁN HOA")
        .setDescription(`
            <:chamxanh:1124058113742479400> \`20\` <a:p_flower22:1135636392374960310> Bông Hoa | \`1,500\` <:O_o:1135831601205481523> coins 
            
            <:chamxanh:1124058113742479400> \`21\` <:bbng:1124017699614371890> Bó Bông | \`3,000\` <:O_o:1135831601205481523> coins
            
            <:chamxanh:1124058113742479400> \`22\` <:ko:1124018356949884928> Cục Kẹo | \`5,000\` <:O_o:1135831601205481523> coins
            
            <:chamxanh:1124058113742479400> \`23\` <:socola:1124018847511478372> Socola | \`8,000\` <:O_o:1135831601205481523> coins
            
            <:chamxanh:1124058113742479400> \`24\` <:gubng:1124018585275211867> Gấu Bông | \`12,000\` <:O_o:1135831601205481523> coins
        `)
        .setColor(0x0099ff)
        .setImage('https://i0.wp.com/boingboing.net/wp-content/uploads/2015/07/tumblr_noa6mdd3yb1qze3hdo1_500.gif?resize=500%2C288')
        .setTimestamp()
        .setFooter({ text: 'Chúc bạn chơi vui vẻ'})

    const nhanEmbed = new EmbedBuilder()
        .setTitle("QUẦY BÁN NHẪN")
        .setDescription(`
        <:chamvang:1125863859740225556> \`25\` <:nhnbc:1124056817048240159> Nhẫn Bạc: | \`80,000\` <:O_o:1135831601205481523> coins 
                        
        <:chamvang:1125863859740225556> \`26\` <:Nhnvng:1124056797238534375> Nhẫn Vàng: | \`150,000\` <:O_o:1135831601205481523> coins 
                    
        <:chamvang:1125863859740225556> \`27\` <:nhan:1124415305347780720> Nhẫn Hồng: | \`200,000\` <:O_o:1135831601205481523> coins
        `)
        .setColor(0xe49300)
        .setImage('https://64.media.tumblr.com/6f39e453ebb570672af6ebcd0478cac6/tumblr_inline_plss2yuzfK1tiiqk5_540.gif')
        .setTimestamp()
        .setFooter({ text: 'Chúc bạn chơi vui vẻ'})
    
    const roleEmbed = new EmbedBuilder()
        .setTitle("QUẦN BÁN ROLE")
        .setDescription(`

        <:chamhong:1125869563838472364> \`28\` <@&1124062125229346920> | \`25,000\` <:O_o:1135831601205481523> coins
        
        <:chamhong:1125869563838472364> \`29\` <@&1125641678913548299> | \`50,000\` <:O_o:1135831601205481523> coins
        
        <:chamhong:1125869563838472364> \`30\` <@&1125641802574209055> | \`100,000\` <:O_o:1135831601205481523> coins
        
        <:chamhong:1125869563838472364> \`31\` <@&1125641989174595594> | \`150,000\` <:O_o:1135831601205481523> coins

        <:chamhong:1125869563838472364> \`32\` <@&1141981735442186240> | \`300,000\` <:O_o:1135831601205481523> coins

        `)
        .setColor("Aqua")
        .setImage('https://i.pinimg.com/originals/04/9c/0c/049c0cbf9ed52f024086ff32dd8603e1.gif')
        .setTimestamp()
        .setFooter({ text: 'Chúc bạn chơi vui vẻ'})

    const ruongEmbed = new EmbedBuilder()
        .setTitle("QUẦY BÁN RƯƠNG")
        .setDescription(`
        
            <:chamvang:1125863859740225556> \`35\` <:ruongbac:1135643679256756374> Rương Bạc | \`15,000\`<:O_o:1135831601205481523> coins
            
            <:chamvang:1125863859740225556> \`36\` <:ruongvang:1135643685476896789> Rương Vàng | \`30,000\`<:O_o:1135831601205481523> coins
            
            <:chamvang:1125863859740225556> \`37\` <:rngkimcuong:1135643691814494278> Rương Đặc Biệt | \`50,000\`<:O_o:1135831601205481523> coins
        `)
        .setColor("Random")
        .setTimestamp()
        .setFooter({ text: 'Chúc bạn chơi vui vẻ'})

        let embeds = [hoaEmbed, nhanEmbed, roleEmbed, ruongEmbed];
        let a = await message.channel.send({ embeds: [embeds[0]] }).catch(e => console.log(e))
        await chuyen_trang(client, a, message.author.id, embeds).catch(e => console.log(e))
    }

    else if (type == 'tool') {
        const toolCauCaEmbed = new EmbedBuilder()
            .setTitle('QUẦN BÁN DỤNG CỤ CÂU CÁ')
            .setDescription(`
            <:chamxanh:1124058113742479400> \`50\` <:Flimsy_Fishing_Rod_NH_Icon:1140523577821626438> Cần câu tre | \`1000\` <:O_o:1135831601205481523> coins

            <:chamxanh:1124058113742479400> \`51\` <:pro_fishing_rod49:1140523548763500665> Cần câu xịn | \`2000\` <:O_o:1135831601205481523> coins

            <:chamxanh:1124058113742479400> \`52\` <:Flimsy_Net_NH_Icon:1140523599170654298> Lưới | \`5000\` <:O_o:1135831601205481523> coins
            
            <:chamxanh:1124058113742479400> \`53\` <:Golden_Net_NH_Inv_Icon:1140523506656874496> Lưới vip | \`10000\` <:O_o:1135831601205481523> coins
            `)
            .setTimestamp()
            .setImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/80c3dffd-c628-49d1-844e-5960a300911b/dec5a92-c7133b22-e89a-4467-8706-166bcbc679ec.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgwYzNkZmZkLWM2MjgtNDlkMS04NDRlLTU5NjBhMzAwOTExYlwvZGVjNWE5Mi1jNzEzM2IyMi1lODlhLTQ0NjctODcwNi0xNjZiY2JjNjc5ZWMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Ym0HwecdEfO6pvoG4SbJA1AIBEWczJiwHGd-erNVluE')
            .setFooter({ text: 'Chúc bạn chơi vui vẻ'})
        const toolMineEmbed = new EmbedBuilder()
            .setTitle('Quần bán cúp')
            .setDescription(`
            <:chamxanh:1124058113742479400> \`40\` <:wooden_pickaxe:1134750444854444042> Cúp gỗ | \`1000\` <:O_o:1135831601205481523> coins

            <:chamxanh:1124058113742479400> \`41\` <:905609866691891220:1134749977529299014> Cúp đá | \`2000\` <:O_o:1135831601205481523> coins

            <:chamxanh:1124058113742479400> \`42\` <:mcmine:1134750599188062350> Cúp sắt | \`5000\` <:O_o:1135831601205481523> coins

            <:chamxanh:1124058113742479400> \`43\` <:Gold_Pickaxe:1134749444785578034> Cúp vàng | \`10000\` <:O_o:1135831601205481523> coins

            <:chamxanh:1124058113742479400> \`44\` <:diamond_pickaxe:1134749671613550592> Cúp kim cương | \`15000\` <:O_o:1135831601205481523> coins

            `)
            .setTimestamp()
            .setImage('https://i.pinimg.com/originals/c5/24/88/c524883fb8d7bf0e26529db473a31a8e.gif')
            .setFooter({ text: 'Chúc bạn chơi vui vẻ'})

        let embeds = [toolCauCaEmbed, toolMineEmbed];
        let a = await message.channel.send({ embeds: [embeds[0]] }).catch(e => console.log(e))
        await chuyen_trang(client, a, message.author.id, embeds).catch(e => console.log(e))
    }

    else if (type == 'farm') {
        const hatEmbed = new EmbedBuilder()
        .setTitle("SHOP CÂY TRỒNG")
        .setDescription(`
            <:chamxanh:1124058113742479400> \`60\` <:seeds97:1155701097806180372> Hạt lúa | \`5,00\` <:O_o:1135831601205481523> coins 
            
            <:chamxanh:1124058113742479400> \`61\` <:Mokoko42:1155701078306852935> Hạt đậu | \`5,00\` <:O_o:1135831601205481523> coins
            
            <:chamxanh:1124058113742479400> \`62\` <:gourdpumpkinseedspeeledshellisol:1155704854606532709> Hạt bí | \`5,00\` <:O_o:1135831601205481523> coins

            <:chamxanh:1124058113742479400> \`63\` <:Melon62:1166407956791840919> Hạt dưa hấu | \`5,00\` <:O_o:1135831601205481523> coins
            
            <:chamxanh:1124058113742479400> \`64\` <:potato45:1166650017264705547> Khoai tây | \`5,00\` <:O_o:1135831601205481523> coins

            <:chamxanh:1124058113742479400> \`65\` <:Carrot29:1166650013603090432> Cà rốt | \`5,00\` <:O_o:1135831601205481523> coins

            <:chamxanh:1124058113742479400> \`66\` <:hand_with_plant:1155701041329872978> Đất | \`2000\` <:O_o:1135831601205481523> coins

        `)
        .setColor('Green')
        .setImage('https://opengameart.org/sites/default/files/crops-preview-animated.gif')
        .setTimestamp()
        .setFooter({ text: "Chúc bạn một ngày tốt lành"})

        const animalEmbed = new EmbedBuilder()
            .setTitle("SHOP VẬT NUÔI")
            .setColor("Green")
            .setDescription(` 
                <:chamxanh:1124058113742479400> \`70\` <:3331_minecraft_cow:1156555169396428830> Con bò | \`10,000\` <:O_o:1135831601205481523> coins

                <:chamxanh:1124058113742479400> \`71\` <:Chicken17:1156557573219168307> Con gà | \`10,000\` <:O_o:1135831601205481523> coins

                <:chamxanh:1124058113742479400> \`72\` <:technoblade64:1166408637623844924> Con heo | \`10,000\` <:O_o:1135831601205481523> coins
            `)
            .setImage('https://media.discordapp.net/attachments/1129012498855636992/1156413823956299878/2ce11169f769ee257dbe2f55d7d2d781.jpg?ex=6514e1cc&is=6513904c&hm=5cf221f79e393f31b9c3000154cf358e814fcef2cfbf33e40fabf8ca2d5a18aa&=&width=481&height=317')
            .setTimestamp()
            .setFooter({ text: "Chúc bạn một ngày tốt lành"})

        let embeds = [hatEmbed, animalEmbed];
        let a = await message.channel.send({ embeds: [embeds[0]] }).catch(e => console.log(e))
        await chuyen_trang(client, a, message.author.id, embeds).catch(e => console.log(e))
    }

    async function chuyen_trang(client, message, authorid, embeds) {
        let trangHienTai = 0
        let buttonRow1 = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('<:jjj:1136731747074191440>')
        .setCustomId('back-page1'),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId('back-page')
            .setEmoji('⬅'),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId('next-page')
            .setEmoji('➡️'),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('<:jj:1136730727610863627>')
            .setCustomId('next-page1')
        )
        if (embeds.length === 1) return message.edit({ embeds: [embeds[0]] })
            const queueEmbed = await message.edit(
            {
                content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`,
                components: [buttonRow1],
                embeds: [embeds[trangHienTai]]
            }
            )
            var collector = queueEmbed.createMessageComponentCollector({
            filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
            })
            collector.on("collect", (interaction) => {
        
            if (interaction.user.id !== authorid) return interaction.reply({ content: "Bạn không thể dùng nút này!", ephemeral: true })
            if (interaction.customId == "next-page") {
                interaction.deferUpdate()
                if (trangHienTai < embeds.length - 1) {
                    trangHienTai++;
                queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                }
                else {
                trangHienTai = 0
                queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                }
            }
            else if (interaction.customId == "back-page") {
                interaction.deferUpdate()
                if (trangHienTai !== 0) {
                    --trangHienTai;
                queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                } else {
                trangHienTai = embeds.length - 1
                queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
                }
            } else if (interaction.customId == "back-page1") {
                interaction.deferUpdate()
                trangHienTai = 0;
                queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
            }
            else if (interaction.customId == "next-page1") {
                interaction.deferUpdate()
                trangHienTai = embeds.length - 1;
                queueEmbed.edit({ content: `**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
            }
            }
        );
    }
  }
}