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
    try {
      const baloImg = `https://media.discordapp.net/attachments/1080138430756966450/1170957876198637629/pngtree-opened-backpack-png-image_462877-removebg-preview.png?ex=655aee81&is=65487981&hm=c0de0f7882c65034a52f5a77fe0d438ff1277de2a0b6e1a0b3e20b4fb55e8340&=&width=625&height=625`
      const cupCacLoai = [
        "Cúp gỗ",
        "Cúp đá",
        "Cúp sắt",
        "Cúp vàng",
        "Cúp kim cương",
      ];
  
      const [
        cup1,
        cup2,
        cup3,
        cup4,
        cup5,
        canCauTre,
        canCauXin,
        luoi,
        luoiVip,
        veryCommonFish,
        commonFish,
        unCommonFish,
        rareFish,
        veryRareFish,
        legendFish,
        than,
        sat,
        vang,
        kc,
        nlb,
        hatLua,
        hatDau,
        hatBi,
        hatDuaHau,
        khoaiTay,
        caRot,
        lua,
        bi,
        duaHau,
        sua,
        trung,
        thitHeo,
        botMi,
        bo,
        banhMi,
        shushi,
        caDongHop,
        boFood,
        gaFood,
        heoFood
      ] = await Promise.all([
        client.cup(message.author.id, "Cúp gỗ"),
        client.cup(message.author.id, "Cúp đá"),
        client.cup(message.author.id, "Cúp sắt"),
        client.cup(message.author.id, "Cúp vàng"),
        client.cup(message.author.id, "Cúp kim cương"),
        client.toolCauCa(message.author.id, "Cần câu tre"),
        client.toolCauCa(message.author.id, "Cần câu xịn"),
        client.toolCauCa(message.author.id, "Lưới"),
        client.toolCauCa(message.author.id, "Lưới vip"),
        client.ca(message.author.id, "Very Common"),
        client.ca(message.author.id, "Common"),
        client.ca(message.author.id, "Uncommon"),
        client.ca(message.author.id, "Rare"),
        client.ca(message.author.id, "Very Rare"),
        client.ca(message.author.id, "Legendary"),
        client.khoangsan(message.author.id, "Than"),
        client.khoangsan(message.author.id, "Sắt"),
        client.khoangsan(message.author.id, "Vàng"),
        client.khoangsan(message.author.id, "Kim cương"),
        client.khoangsan(message.author.id, "Ngọc lục bảo"),
        client.nongSan(message.author.id, "hạt lúa"),
        client.nongSan(message.author.id, "hạt đậu"),
        client.nongSan(message.author.id, "hạt bí"),
        client.nongSan(message.author.id, "hạt dưa hấu"),
        client.nongSan(message.author.id, "khoai tây"),
        client.nongSan(message.author.id, "cà rốt"),
        client.nongSan(message.author.id, "lúa"),
        client.nongSan(message.author.id, "bí"),
        client.nongSan(message.author.id, "dưa hấu"),
        client.sanPham(message.author.id, "sữa"),
        client.sanPham(message.author.id, "trứng"), 
        client.sanPham(message.author.id, "thịt heo"), 
        client.sanPham(message.author.id, "bột mì"), 
        client.sanPham(message.author.id, "bơ"), 
        client.sanPham(message.author.id, "bánh mì"), 
        client.sanPham(message.author.id, "shushi"), 
        client.sanPham(message.author.id, "cá đóng hộp"), 
        client.thucAnAnimal(message.author.id, "thức ăn bò"), 
        client.thucAnAnimal(message.author.id, "thức ăn gà"), 
        client.thucAnAnimal(message.author.id, "thức ăn heo"), 
      ]);

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
        .setTimestamp()
        .setThumbnail(baloImg)
      
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
        .setTimestamp()
        .setThumbnail(baloImg)

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
      .setTimestamp()
        .setThumbnail(baloImg)
  
      const caEmbed = new Discord.EmbedBuilder()
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
        .setTimestamp()
        .setThumbnail(baloImg)
  
        const nongSanEmbed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setTitle("KHO NÔNG SẢN VÀ THỨC ĂN VẬT NUÔI")
        .setDescription(
          `
        \`300\` | <:04c48f45474c4130a2fb5ff3a3939268:1166927884187877417> Thức ăn bò: ${boFood}
        \`301\` | <:chickenFeed:1166927888336027748> Thức ăn gà: ${gaFood}
        \`302\` | <:pigFeed:1166929189681766461> Thức ăn heo: ${heoFood}
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
        .setTimestamp()
        .setThumbnail(baloImg)
  
        const sanPhamEmbed= new Discord.EmbedBuilder()
          .setColor("Green")
          .setTitle("KHO SẢN PHẨM")
          .setDescription(
            `
            \`303\` |  <:eje_minecraft_milk:1156555171493597204> Sữa: ${sua}
            \`304\` |  <:Minecraft_Egg:1156555165189550101> Trứng: ${trung}
            \`305\` |  <:rawporkchop76:1166408633622482964> Thịt heo: ${thitHeo}
            \`306\` |  <:6289_flour:1155701022891704360> Bột mì: ${botMi}
            \`307\` |  <:butterTT:1157319277335035974> Bơ: ${bo}
            \`308\` |  <:6429_minecraft_bread:1167391995245891716> Bánh mì: ${banhMi}
            \`309\` |  <:Item_Delicious_Tuna_Sushi:1167391997506629632> Shushi: ${shushi}
            \`310\` |  <:Open_Canned_Sardines46:1167392001436700712> Cá đóng hộp: ${caDongHop}
            `
          )
          .setTimestamp()
          .setThumbnail(baloImg)
  
      let embeds = [cupEmbed, toolCCEmbed, khoangSanEmbed, caEmbed, nongSanEmbed, sanPhamEmbed];
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
    } catch(err) {
      console.log("Lỗi lệnh kho:", err);
    }
  },
};
