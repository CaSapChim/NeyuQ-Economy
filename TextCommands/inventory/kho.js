const Discord = require('discord.js')
const toolCauCaModel = require('../../database/models/toolCauCaModel')
const ownerId = require('../../config.json').OWNER_ID

module.exports = {
    name: "kho",
    aliases: ["ks", "khoangsan"],
    description: "Xem các loại khoáng sản trong kho của bạn",
    /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {*} args
     */
    run: async (client, message, args) => {      
         

      const cupCacLoai = [
        'Cúp gỗ',
        'Cúp đá',
        'Cúp sắt',
        'Cúp vàng',
        'Cúp kim cương'
      ]
      
      const than = await client.khoangsan(message.author.id, "Than")
      const sat = await client.khoangsan(message.author.id, "Sắt")
      const vang = await client.khoangsan(message.author.id, "Vàng")
      const kc = await client.khoangsan(message.author.id, "Kim cương")
      const nlb = await client.khoangsan(message.author.id, "Ngọc lục bảo")


      const cup1 = await client.cup(message.author.id, "Cúp gỗ")
      const cup2 = await client.cup(message.author.id, "Cúp đá")
      const cup3 = await client.cup(message.author.id, "Cúp sắt")
      const cup4 = await client.cup(message.author.id, "Cúp vàng")
      const cup5 = await client.cup(message.author.id, "Cúp kim cương")

      const canCauTre = await client.toolCauCa(message.author.id, "Cần câu tre")
      const canCauXin = await client.toolCauCa(message.author.id, "Cần câu xịn")
      const luoi = await client.toolCauCa(message.author.id, "Lưới")
      const luoiVip = await client.toolCauCa(message.author.id, "Lưới vip")

      const khoangSanEmbed = new Discord.EmbedBuilder()
      .setColor(0xff9900)
      .setTitle(`Kho khoáng sản của ${message.author.username}`)
      .setDescription(
          `${`<:905609870114439208:1134500336862765138> Than: ${than}\n`}` +
          `${`<:842601384561868810:1134500649548124161> Sắt: ${sat}\n`}` +
          `${`<:905609869485289482:1134500596871868588> Vàng: ${vang}\n`}` +
          `${`<:943215979935187074:1134500706095743150> Kim cương: ${kc}\n`}` +
          `${`<:905609867769839637:1134500619898593380> Ngọc lục bảo: ${nlb}\n`}`
      )
      .setFooter({text: 'Chúc bạn một ngày tốt lành'})
      .setTimestamp();

      const cupEmbed = new Discord.EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Túi dụng cụ của ${message.author.username} `)
      .setDescription(
        `\`120\` | <:wooden_pickaxe:1134750444854444042> ${cupCacLoai[0]}: ${cup1}\n` +
        `\`121\` | <:905609866691891220:1134749977529299014> ${cupCacLoai[1]}: ${cup2}\n` +
        `\`122\` | <:mcmine:1134750599188062350> ${cupCacLoai[2]}: ${cup3}\n` +
        `\`123\` | <:Gold_Pickaxe:1134749444785578034> ${cupCacLoai[3]}: ${cup4}\n` +
        `\`124\` | <:diamond_pickaxe:1134749671613550592> ${cupCacLoai[4]}: ${cup5}`
      )
      .setFooter({text: 'Chúc bạn một ngày tốt lành'})
      .setTimestamp()

      const toolCCEmbed = new Discord.EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Túi dụng cụ câu cá của ${message.author.username} `)
      .setDescription(
        `\`130\` | <:Flimsy_Fishing_Rod_NH_Icon:1140523577821626438> Cần câu tre: ${canCauTre}\n` +
        `\`131\` | <:pro_fishing_rod49:1140523548763500665> Cần câu xin: ${canCauXin}\n` +
        `\`132\` | <:Flimsy_Net_NH_Icon:1140523599170654298> Lưới: ${luoi}\n` +
        `\`133\` | <:Golden_Net_NH_Inv_Icon:1140523506656874496> Lưới vip: ${luoiVip}`
      )
      .setFooter({text: 'Chúc bạn một ngày tốt lành'})
      .setTimestamp()

      let embeds = [cupEmbed, toolCCEmbed, khoangSanEmbed];
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