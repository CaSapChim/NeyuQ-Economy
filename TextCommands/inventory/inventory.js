const Discord = require("discord.js");
const itemModel = require('../../database/models/itemModel')

/**
 *          Note
 * các loại cúp là type = 1                          
 * các loại hoa, gấu bông, socola, kẹo là type = 2     
 * các loại rương là type = 3  
 * các loại nhẫn thì type = 4     
 * các loãi huy hiệu thì type = 5                 
 */

module.exports = {
  name: "inventory",
  aliases: ["inv", "bag"],
  description: "Xem các vật phẩm trong túi đồ của bạn",
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {*} args
   * @param {*} userData
   */
  run: async (client, message, args, userData) => {

    const nhanCacLoai = [
      'Nhẫn bạc',
      'Nhẫn vàng',
      'Nhẫn hồng'
    ]

    const hoaCacLoai = [
      'Bông hoa',
      'Bó bông',
      'Cục kẹo',
      'Socola',
      'Gấu bông'
    ]

    const ruongCacLoai = [
      'Rương bạc',
      'Rương vàng',
      'Rương đặc biệt'
    ]

    const huyHieuCacLoai = [
      'Tình Yêu Cháy Bỏng', 
      'Huy Hiệu Tri Kỉ',
      'Huy Hiệu Thân Thiết',
      'Tri Kỉ Valentine', 
      'Huy Hiệu VDay',
      'Huy Hiệu Cặp Đôi',
  ]

    let soLuongNhanBac = 0
    let soLuongNhanVang = 0
    let soLuongNhanHong = 0

    let soLuongRuongBac = 0
    let soLuongRuongVang = 0
    let soLuongRuongDacBiet = 0

    let soLuongBongHoa = 0
    let soLuongBoBong = 0
    let soLuongCucKeo = 0
    let soLuongSocola = 0
    let soLuongGauBong = 0

    let soLuongHH1 = 0
    let soLuongHH2 = 0
    let soLuongHH3 = 0
    let soLuongHH4 = 0
    let soLuongHH5 = 0
    let soLuongHH6 = 0
    
    const hoa = await itemModel
      .find({
        userId: message.author.id, type: 2
      })
      .sort({ soLuong: -1 })

    const ruong = await itemModel 
      .find({
        userId: message.author.id, type: 3
      })
      .sort({ soLuong: -1 })

    const nhan = await itemModel
      .find({
        userId: message.author.id, type: 4
      })
      .sort({ soLuong: -1 })
    const huyHieu = await itemModel
      .find({
        userId: message.author.id, type: 5
      })
      .sort({ soLuong: -1 })

    for (const itemNhan of nhan) {
        if ( itemNhan.name === nhanCacLoai[0] ) soLuongNhanBac = itemNhan.soLuong
        if ( itemNhan.name === nhanCacLoai[1] ) soLuongNhanVang = itemNhan.soLuong
        if ( itemNhan.name === nhanCacLoai[2] ) soLuongNhanHong = itemNhan.soLuong
    }

    for (const itemHoa of hoa) {
        if ( itemHoa.name === hoaCacLoai[0] ) soLuongBongHoa = itemHoa.soLuong
        if ( itemHoa.name === hoaCacLoai[1] ) soLuongBoBong = itemHoa.soLuong
        if ( itemHoa.name === hoaCacLoai[2] ) soLuongCucKeo = itemHoa.soLuong
        if ( itemHoa.name === hoaCacLoai[3] ) soLuongSocola = itemHoa.soLuong
        if ( itemHoa.name === hoaCacLoai[4] ) soLuongGauBong = itemHoa.soLuong
    }

    for (const itemRuong of ruong) {
      if ( itemRuong.name === ruongCacLoai[0] ) soLuongRuongBac = itemRuong.soLuong
      if ( itemRuong.name === ruongCacLoai[1] ) soLuongRuongVang = itemRuong.soLuong
      if ( itemRuong.name === ruongCacLoai[2] ) soLuongRuongDacBiet = itemRuong.soLuong
    }

    for (const itemHuyHieu of huyHieu) {
      if ( itemHuyHieu.name === huyHieuCacLoai[0] ) soLuongHH1 = itemHuyHieu.soLuong
      if ( itemHuyHieu.name === huyHieuCacLoai[1] ) soLuongHH2  = itemHuyHieu.soLuong
      if ( itemHuyHieu.name === huyHieuCacLoai[2] ) soLuongHH3  = itemHuyHieu.soLuong
      if ( itemHuyHieu.name === huyHieuCacLoai[3] ) soLuongHH4  = itemHuyHieu.soLuong
      if ( itemHuyHieu.name === huyHieuCacLoai[4] ) soLuongHH5  = itemHuyHieu.soLuong
      if ( itemHuyHieu.name === huyHieuCacLoai[5] ) soLuongHH6  = itemHuyHieu.soLuong
    }  

    
    const hoaEmbed = new Discord.EmbedBuilder()
    .setColor(0xaf00fc)
    .setTitle(`TÚI ĐỰNG ĐỒ`)
    .setDescription(
      `\`100\` | ${`<a:p_flower22:1135636392374960310> ${hoaCacLoai[0]}: **${soLuongBongHoa}**\n`}` +
      `\`101\` | ${`<:bbng:1124017699614371890> ${hoaCacLoai[1]}: **${soLuongBoBong}**\n`}` +
      `\`102\` | ${`<:ko:1124018356949884928> ${hoaCacLoai[2]}: **${soLuongCucKeo}**\n`}` +
      `\`103\` | ${`<:socola:1124018847511478372> ${hoaCacLoai[3]}: **${soLuongSocola}**\n`}` +
      `\`104\` | ${`<:gubng:1124018585275211867> ${hoaCacLoai[4]}: **${soLuongGauBong}**\n`}`
      )
      .setFooter({text: 'Chúc bạn chơi vui vẻ'})
      .setTimestamp();

      const nhanEmbed = new Discord.EmbedBuilder()
        .setColor(0xaf00fc)
        .setTitle(`BỘ SƯU TẬP NHẪN`)
        .setDescription(
            `\`110\` | ${`<:nhnbc:1124056817048240159> ${nhanCacLoai[0]}: **${soLuongNhanBac}**\n`}` +
            `\`111\` | ${`<:Nhnvng:1124056797238534375> ${nhanCacLoai[1]}: **${soLuongNhanVang}**\n`}` +
            `\`112\` | ${`<:nhan:1124415305347780720> ${nhanCacLoai[2]}: **${soLuongNhanHong}**\n`}`
        )
        .setFooter({text: 'Chúc bạn chơi vui vẻ'})
        .setTimestamp();
      
    const ruongEmbed = new Discord.EmbedBuilder()
      .setColor('Gold')
      .setTitle(`KHO BÁU`)
      .setDescription(
          `\`120\` | ${`<:ruongbac:1135643679256756374> ${ruongCacLoai[0]}: **${soLuongRuongBac}**\n`}` +
          `\`121\` | ${`<:ruongvang:1135643685476896789> ${ruongCacLoai[1]}: **${soLuongRuongVang}**\n`}` +
          `\`122\` | ${`<:rngkimcuong:1135643691814494278> ${ruongCacLoai[2]}: **${soLuongRuongDacBiet}**\n`}`
      )
      .setFooter({text: 'Chúc bạn chơi vui vẻ'})
      .setTimestamp();

    const huyHieuEmbed = new Discord.EmbedBuilder() 
        .setColor('#9cfcf2')
        .setTitle(`BỘ SƯU TẬP HUY HIỆU`)
        .setDescription(  
          `> ${`<:tinhyeuchaybong:1136568485166718986> | ${huyHieuCacLoai[0]}: **${soLuongHH1}**\n`}`+
          `> ${`<:trik:1122444231223558174> | ${huyHieuCacLoai[1]}: **${soLuongHH2}**\n`}`+
          `> ${`<:banbe:1136575697909989426> | ${huyHieuCacLoai[2]}: **${soLuongHH3}**\n`}`+
          `> ${`<:triki:1136577819409907793> | ${huyHieuCacLoai[3]}: **${soLuongHH4}**\n`}`+
          `> ${`<:valnetine:1136578277570510929> | ${huyHieuCacLoai[4]}: **${soLuongHH5}**\n`}`+
          `> ${`<:trikivalentine:1136577479679688815> | ${huyHieuCacLoai[5]}: **${soLuongHH6}**\n`}`
        )
        .setFooter({text: 'Chúc bạn chơi vui vẻ'})
        .setTimestamp()

    let embeds = [hoaEmbed, nhanEmbed, ruongEmbed, huyHieuEmbed];
    let a = await message.channel.send({ content: `<@${message.author.id}>`, embeds: [embeds[0]] }).catch(e => console.log(e))
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
              content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`,
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
                queueEmbed.edit({ content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
              }
              else {
                trangHienTai = 0
                queueEmbed.edit({ content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
              }
            }
            else if (interaction.customId == "back-page") {
              interaction.deferUpdate()
              if (trangHienTai !== 0) {
                --trangHienTai;
                queueEmbed.edit({ content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
              } else {
                trangHienTai = embeds.length - 1
                queueEmbed.edit({ content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
              }
            } else if (interaction.customId == "back-page1") {
              interaction.deferUpdate()
              trangHienTai = 0;
              queueEmbed.edit({ content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
            }
            else if (interaction.customId == "next-page1") {
              interaction.deferUpdate()
              trangHienTai = embeds.length - 1;
              queueEmbed.edit({ content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${embeds.length}**`, embeds: [embeds[trangHienTai]], components: [buttonRow1] });
            }
          }
      );
    }
  },
};
