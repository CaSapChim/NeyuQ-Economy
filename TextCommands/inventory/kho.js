const Discord = require('discord.js')
const ownerId = require('../../config.json').OWNER_ID
const itemModel = require('../../database/models/itemModel')

module.exports = {
    name: "kho",
    aliases: ["ks", "khoangsan"],
    description: "Xem các loại khoáng sản trong kho của bạn",
    /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {*} args
     * @param {*} userData
     */
    run: async (client, message, args, userData) => {
      if (!ownerId.includes(message.author.id)) return
      const userInv = userData.inventory;
      
      // Function to get the quantity of a specific item in the inventory
      const getItemQuantity = (itemName) => {
        const itemArr = userInv.filter((item) => item.name === itemName);
        return itemArr.length > 0 ? itemArr[0].soLuong : 0;
      };    

      const cupCacLoai = [
        'Cúp gỗ',
        'Cúp đá',
        'Cúp sắt',
        'Cúp vàng',
        'Cúp kim cương'
      ]
      
      let soLuongCupGo = 0
      let soLuongCupDa = 0
      let soLuongCupSat = 0
      let soLuongCupVang = 0
      let soLuongCupKimCuong = 0

      const countVang = getItemQuantity("Vàng");
      const countSat = getItemQuantity("Sắt");
      const countThan = getItemQuantity("Than");
      const countNgocLucBao = getItemQuantity("Ngọc lục bảo");
      const countKimCuong = getItemQuantity("Kim cương");

      const cup = await itemModel
        .find({
          userId: message.author.id, type: 1
        })
        .sort({ soLuong: -1 })

      for (const itemCup of cup) {
        if ( itemCup.name === cupCacLoai[0] ) soLuongCupGo = itemCup.soLuong
        if ( itemCup.name === cupCacLoai[1] ) soLuongCupDa = itemCup.soLuong
        if ( itemCup.name === cupCacLoai[2] ) soLuongCupSat = itemCup.soLuong
        if ( itemCup.name === cupCacLoai[3] ) soLuongCupVang = itemCup.soLuong
        if ( itemCup.name === cupCacLoai[4] ) soLuongCupKimCuong = itemCup.soLuong
    }

      const khoangSanEmbed = new Discord.EmbedBuilder()
      .setColor(0xff9900)
      .setTitle(`Kho khoáng sản của ${message.author.username}`)
      .setDescription(
          `${`<:905609870114439208:1134500336862765138> Than: ${countThan}\n`}` +
          `${`<:842601384561868810:1134500649548124161> Sắt: ${countSat}\n`}` +
          `${`<:905609869485289482:1134500596871868588> Vàng: ${countVang}\n`}` +
          `${`<:943215979935187074:1134500706095743150> Kim cương: ${countKimCuong}\n`}` +
          `${`<:905609867769839637:1134500619898593380> Ngọc lục bảo: ${countNgocLucBao}\n`}`
      )
      .setTimestamp();

      const cupEmbed = new Discord.EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Túi dụng cụ của ${message.author.username} `)
      .setDescription(
        `<:wooden_pickaxe:1134750444854444042> ${cupCacLoai[0]}: ${soLuongCupGo}\n` +
        `<:905609866691891220:1134749977529299014> ${cupCacLoai[1]}: ${soLuongCupDa}\n` +
        `<:mcmine:1134750599188062350> ${cupCacLoai[2]}: ${soLuongCupSat}\n` +
        `<:Gold_Pickaxe:1134749444785578034> ${cupCacLoai[3]}: ${soLuongCupVang}\n` +
        `<:diamond_pickaxe:1134749671613550592> ${cupCacLoai[4]}: ${soLuongCupKimCuong}`
      )

      .setFooter({text: 'Chúc bạn một ngày tốt lành'})
      .setTimestamp()
      let embeds = [cupEmbed, khoangSanEmbed];
    let a = await message.channel.send({ embeds: [embeds[0]] }).catch(e => console.log(e))
    await chuyen_trang(client, a, message.author.id, embeds).catch(e => console.log(e))

    async function chuyen_trang(client, message, authorid, embeds) {
      let trangHienTai = 0
      let buttonRow1 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
        .setStyle(Discord.ButtonStyle.Secondary)
        .setEmoji('<:jjj:1136731747074191440>')
        .setCustomId('back-page1'),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Primary)
          .setCustomId('back-page')
          .setEmoji('⬅'),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Primary)
          .setCustomId('next-page')
          .setEmoji('➡️'),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Secondary)
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
              queueEmbed.edit({ content: `**Current Page - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
            }
            else if (interaction.customId == "next-page1") {
              interaction.deferUpdate()
              trangHienTai = embeds.length - 1;
              queueEmbed.edit({ content: `**Current Page - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
            }
          }
      );
    }
    }
}