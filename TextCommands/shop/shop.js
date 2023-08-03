const {
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  Client,
  Message,
  StringSelectMenuBuilder,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "shop",
  description: "Xem danh sách các lệnh của bot",
  aliases: ["cuahang", "store"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {*} args
   * @returns
   */
  run: async (client, message, args, userData) => {
    let helpMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("shop_menu")
        .setPlaceholder("Shop Menu")
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
           {
            label: "Hoa",
            description: "Quầy bán hoa",
            value: "flower",
            emoji: "<:shopbnhoa:1123907266609946624>",
          }, 
          {
            label: "Nhẫn",
            description: "Quầy bán nhẫn",
            value: "ring",
            emoji: "<:Nhnvng:1124056797238534375>",
          },
          {
            label: "Role",
            description: "Quầy bán role",
            value: "role",
            emoji: "<:shoprole:1124059582805856267>",
          },
          {
            label: "Rương",
            description: "Quầy bán rương",
            value: "chest",
            emoji: "<:rng:1124057508177256598>",
          }
         
        ])
    );

    let editEmbed = new EmbedBuilder()
      .setTitle('Chào mừng bạn đã đến shop của chúng tôi!')
      .setDescription(`
      
      <:shopbnhoa:1123907266609946624> **Quầy Bán Hoa**
      ㅤㅤ• Mua các loại hoa đang bán
      
      <:nhan:1124415305347780720> **Quầy Bán Nhẫn**
      ㅤㅤ• Mua các loại nhẫn đang có
      
      <:shoprole:1124059582805856267> **Quầy bán role**
      ㅤㅤ• Mua các loại role trong shop
      
      <:rng:1124057508177256598> **Quầy Gacha**
      ㅤㅤ• Mua các rương gacha`)
      .setColor("Green")
      .setImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ceab6b05-066e-4f6b-82ab-d8d718e2cbb5/dc5eydb-6e88187a-9aae-4800-a8b8-65c488b4f3fe.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NlYWI2YjA1LTA2NmUtNGY2Yi04MmFiLWQ4ZDcxOGUyY2JiNVwvZGM1ZXlkYi02ZTg4MTg3YS05YWFlLTQ4MDAtYThiOC02NWM0ODhiNGYzZmUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0kOLnE_p2Wd8wfzKxZU426XYjVS-mnrXbT1m-jO9fas')

    message.channel
      .send({ embeds: [editEmbed], components: [helpMenu] })
      .then((msg) => {
        setTimeout(async function () {
          await msg.delete();
        }, 180000);
      });
  },
};
