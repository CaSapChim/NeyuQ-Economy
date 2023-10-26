const Discord = require("discord.js");
const toolCauCaModel = require("../../database/models/toolCauCaModel");
const ownerId = require("../../config.json").OWNER_ID;

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
    let checkJob = await client.checkJob(message.author.id);

    const cupCacLoai = [
      "Cúp gỗ",
      "Cúp đá",
      "Cúp sắt",
      "Cúp vàng",
      "Cúp kim cương",
    ];

    const veryCommonFish = await client.ca(message.author.id, "Very Common");
    const commonFish = await client.ca(message.author.id, "Common");
    const unCommonFish = await client.ca(message.author.id, "Uncommon");
    const rareFish = await client.ca(message.author.id, "Rare");
    const veryRareFish = await client.ca(message.author.id, "Very Rare");
    const legendFish = await client.ca(message.author.id, "Legendary");

    const than = await client.khoangsan(message.author.id, "Than");
    const sat = await client.khoangsan(message.author.id, "Sắt");
    const vang = await client.khoangsan(message.author.id, "Vàng");
    const kc = await client.khoangsan(message.author.id, "Kim cương");
    const nlb = await client.khoangsan(message.author.id, "Ngọc lục bảo");

    const hatLua = await client.nongSan(message.author.id, "hạt lúa");
    const hatDau = await client.nongSan(message.author.id, "hạt đậu");
    const hatBi = await client.nongSan(message.author.id, "hạt bí");
    const hatDuaHau = await client.nongSan(message.author.id, "hạt dưa hấu");
    const khoaiTay = await client.nongSan(message.author.id, "khoai tây");
    const caRot = await client.nongSan(message.author.id, "cà rốt");
    const lua = await client.nongSan(message.author.id, "lúa");
    const bi = await client.nongSan(message.author.id, "bí");
    const duaHau = await client.nongSan(message.author.id, "dưa hấu");

    const embedKS = new Discord.EmbedBuilder()
      .setColor(0xff9900)
      .setTitle(`KHO KHOÁNG SẢN`)
      .setDescription(
        `\`230\` | ${`<:905609870114439208:1134500336862765138> Than: ${than}\n`}` +
          `\`231\` | ${`<:842601384561868810:1134500649548124161> Sắt: ${sat}\n`}`
      )
      .setFooter({ text: "Chúc bạn một ngày tốt lành" })
      .setTimestamp();

    const embedCa = new Discord.EmbedBuilder()
      .setColor("Blue")
      .setTitle(`KHO CÁ`)
      .setDescription(
        `${`\`240\` | <:qpfish18:1166367845303734272> Very Common: ${veryCommonFish}\n`}` +
          `${`\`241\` | 🐟 Common: ${commonFish}\n`}` +
          `${`\`242\` | 🐠 Uncommon: ${unCommonFish}\n`}` +
          `${`\`243\` | <:Intermediate17:1166579964582314084> Rare: ${rareFish}\n`}` +
          `${`\`244\` | <:Tropical_Fish_JE2_BE226:1166367853109329940> Very Rare: ${veryRareFish}\n`}` +
          `${`\`245\` | <a:Greys_Shark_Happy68:1166643890456121344> Legendary: ${legendFish}\n`}`
      )
      .setFooter({ text: "Chúc bạn một ngày tốt lành" })
      .setTimestamp();

      const embedNongSan = new Discord.EmbedBuilder()
      .setColor("Green")
      .setTitle("KHO NÔNG SẢN")
      .setDescription(
        `
      \`251\` | <:daunh_1:1156608655060381760> Hạt đậu: ${hatDau}
      \`254\` | <:potato45:1166650017264705547> Khoai tây: ${khoaiTay}
      \`255\` | <:Carrot29:1166650013603090432> Cà rốt: ${caRot}
      \`256\` | <:LC_Wheat:1155701062670504037> Lúa: ${lua}
      \`257\` | <:mc_carved_pumpkin45:1155704587462922272> Bí: ${bi} 
      \`258\` | <:Melon8:1166407706496733284> Dưa hấu: ${duaHau}
      `
      )
      .setFooter({ text: "Chúc bạn một ngày tốt lành" })
      .setTimestamp();

    let embeds = [];
    await checkJobEmbed(checkJob);
    let a = await message
      .reply({ content: `<@${message.author.id}>`, embeds: [embeds[0]] })
      .catch((e) => console.log(e));
    await chuyen_trang(client, a, message.author.id, embeds).catch((e) =>
      console.log(e)
    );

    async function chuyen_trang(client, message, authorid, embeds) {
      let trangHienTai = 0;
      let buttonRow1 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji("<:jjj:1136731747074191440>")
          .setCustomId("back-page1"),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Primary)
          .setCustomId("back-page")
          .setEmoji("⬅"),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Primary)
          .setCustomId("next-page")
          .setEmoji("➡️"),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Secondary)
          .setEmoji("<:jj:1136730727610863627>")
          .setCustomId("next-page1")
      );
      if (embeds.length === 1) return message.edit({ embeds: [embeds[0]] });
      const queueEmbed = await message.edit({
        content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${
          embeds.length
        }**`,
        components: [buttonRow1],
        embeds: [embeds[trangHienTai]],
      });
      var collector = queueEmbed.createMessageComponentCollector({
        filter: (interaction) =>
          (interaction.isButton() || interaction.isSelectMenu()) &&
          interaction.message.author.id == client.user.id,
      });
      collector.on("collect", (interaction) => {
        if (interaction.user.id !== authorid)
          return interaction.reply({
            content: "Bạn không thể dùng nút này!",
            ephemeral: true,
          });
        if (interaction.customId == "next-page") {
          interaction.deferUpdate();
          if (trangHienTai < embeds.length - 1) {
            trangHienTai++;
            queueEmbed.edit({
              content: `<@${authorid}>\n**Trang hiện tại - ${
                trangHienTai + 1
              }/${embeds.length}**`,
              embeds: [embeds[trangHienTai]],
              components: [buttonRow1],
            });
          } else {
            trangHienTai = 0;
            queueEmbed.edit({
              content: `<@${authorid}>\n**Trang hiện tại - ${
                trangHienTai + 1
              }/${embeds.length}**`,
              embeds: [embeds[trangHienTai]],
              components: [buttonRow1],
            });
          }
        } else if (interaction.customId == "back-page") {
          interaction.deferUpdate();
          if (trangHienTai !== 0) {
            --trangHienTai;
            queueEmbed.edit({
              content: `<@${authorid}>\n**Trang hiện tại - ${
                trangHienTai + 1
              }/${embeds.length}**`,
              embeds: [embeds[trangHienTai]],
              components: [buttonRow1],
            });
          } else {
            trangHienTai = embeds.length - 1;
            queueEmbed.edit({
              content: `<@${authorid}>\n**Trang hiện tại - ${
                trangHienTai + 1
              }/${embeds.length}**`,
              embeds: [embeds[trangHienTai]],
              components: [buttonRow1],
            });
          }
        } else if (interaction.customId == "back-page1") {
          interaction.deferUpdate();
          trangHienTai = 0;
          queueEmbed.edit({
            content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${
              embeds.length
            }**`,
            embeds: [embeds[trangHienTai]],
            components: [buttonRow1],
          });
        } else if (interaction.customId == "next-page1") {
          interaction.deferUpdate();
          trangHienTai = embeds.length - 1;
          queueEmbed.edit({
            content: `<@${authorid}>\n**Trang hiện tại - ${trangHienTai + 1}/${
              embeds.length
            }**`,
            embeds: [embeds[trangHienTai]],
            components: [buttonRow1],
          });
        }
      });
    }
    async function checkJobEmbed(nameJob) {
      if (nameJob == "Thợ mỏ") {
        const cup1 = await client.cup(message.author.id, "Cúp gỗ");
        const cup2 = await client.cup(message.author.id, "Cúp đá");
        const cup3 = await client.cup(message.author.id, "Cúp sắt");
        const cup4 = await client.cup(message.author.id, "Cúp vàng");
        const cup5 = await client.cup(message.author.id, "Cúp kim cương");

        const cupEmbed = new Discord.EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(`KHO CÚP`)
          .setDescription(
            `\`200\` | <:wooden_pickaxe:1134750444854444042> ${cupCacLoai[0]}: ${cup1}\n` +
              `\`201\` | <:905609866691891220:1134749977529299014> ${cupCacLoai[1]}: ${cup2}\n` +
              `\`202\` | <:mcmine:1134750599188062350> ${cupCacLoai[2]}: ${cup3}\n` +
              `\`203\` | <:Gold_Pickaxe:1134749444785578034> ${cupCacLoai[3]}: ${cup4}\n` +
              `\`204\` | <:diamond_pickaxe:1134749671613550592> ${cupCacLoai[4]}: ${cup5}`
          )
          .setFooter({ text: "Chúc bạn một ngày tốt lành" })
          .setTimestamp();

        const khoangSanEmbed = new Discord.EmbedBuilder()
          .setColor(0xff9900)
          .setTitle(`KHO KHOÁNG SẢN`)
          .setDescription(
            `\`230\` | ${`<:905609870114439208:1134500336862765138> Than: ${than}\n`}` +
              `\`231\` | ${`<:842601384561868810:1134500649548124161> Sắt: ${sat}\n`}` +
              `\`232\` | ${`<:905609869485289482:1134500596871868588> Vàng: ${vang}\n`}` +
              `\`233\` | ${`<:943215979935187074:1134500706095743150> Kim cương: ${kc}\n`}` +
              `\`234\` | ${`<:905609867769839637:1134500619898593380> Ngọc lục bảo: ${nlb}\n`}`
          )
          .setFooter({ text: "Chúc bạn một ngày tốt lành" })
          .setTimestamp();
        return embeds.push(cupEmbed, khoangSanEmbed, embedCa, embedNongSan);
      } else if (nameJob == "Ngư dân") {
        const canCauTre = await client.toolCauCa(
          message.author.id,
          "Cần câu tre"
        );
        const canCauXin = await client.toolCauCa(
          message.author.id,
          "Cần câu xịn"
        );
        const luoi = await client.toolCauCa(message.author.id, "Lưới");
        const luoiVip = await client.toolCauCa(message.author.id, "Lưới vip");

        const toolCCEmbed = new Discord.EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(`DỤNG CỤ CÂU CÁ`)
          .setDescription(
            `\`210\` | <:Flimsy_Fishing_Rod_NH_Icon:1140523577821626438> Cần câu tre: ${canCauTre}\n` +
              `\`211\` | <:pro_fishing_rod49:1140523548763500665> Cần câu xin: ${canCauXin}\n` +
              `\`212\` | <:Flimsy_Net_NH_Icon:1140523599170654298> Lưới: ${luoi}\n` +
              `\`213\` | <:Golden_Net_NH_Inv_Icon:1140523506656874496> Lưới vip: ${luoiVip}`
          )
          .setFooter({ text: "Chúc bạn một ngày tốt lành" })
          .setTimestamp();

        return embeds.push(toolCCEmbed, embedCa, embedNongSan, embedKS);
      } else if (nameJob == "Nông dân") {
        const nongSanEmbed = new Discord.EmbedBuilder()
          .setColor("Green")
          .setTitle("KHO NÔNG SẢN")
          .setDescription(
            `
          \`250\` | <:seeds97:1155701097806180372> Hạt lúa: ${hatLua}
          \`251\` | <:daunh_1:1156608655060381760> Hạt đậu: ${hatDau}
          \`252\` | <:gourdpumpkinseedspeeledshellisol:1155704854606532709> Hạt bí: ${hatBi}
          \`253\` | <:Melon62:1166407956791840919> Hạt dưa hấu: ${hatDuaHau}
          \`254\` | <:potato45:1166650017264705547> Khoai tây: ${khoaiTay}
          \`255\` | <:Carrot29:1166650013603090432> Cà rốt: ${caRot}
          \`256\` | <:LC_Wheat:1155701062670504037> Lúa: ${lua}
          \`257\` | <:mc_carved_pumpkin45:1155704587462922272> Bí: ${bi} 
          \`258\` | <:Melon8:1166407706496733284> Dưa hấu: ${duaHau}
          `
          )
          .setFooter({ text: "Chúc bạn một ngày tốt lành" })
          .setTimestamp();
        return embeds.push(nongSanEmbed, embedCa, embedKS);
      }
    }
  },
};
