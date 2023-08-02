const Discord = require("discord.js");
const OWNER_ID = require('../../config.json').OWNER_ID

/**
 *          Note
 * các loại cúp là type = 1                          ---
 * các loại hoa, gấu bông, socola, kẹo là type = 2     |==> itemSchema.js
 * các loại rương là type = 3                        ---
 * 
 * nhẫn các loại thì type 1 : bạc
 *                   type 2 : vàng
 *                   type 3 : hồng
 */


const cupCacLoai = [
  "Cúp gỗ",
  "Cúp đá",
  "Cúp sắt",
  "Cúp vàng",
  "Cúp kim cương",
];

const nhanCacLoai = ["Nhẫn bạc", "Nhẫn vàng", "Nhẫn hồng"];

const hoaCacLoai = ["Bông hoa", "Bó hoa", "Cục kẹo", "Socola", "Gấu bông"];

const roleCacLoai = [
  "<@&1124062125229346920>",
  "<@&1125641678913548299>",
  "<@&1125641802574209055>",
  "<@&1125641989174595594>",
];

const ruongCacLoai = [
  'Rương bạc',
  'Rương vàng',
  'Rương đặt biệt'
]

module.exports = {
  name: "buy",
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {*} args
   * @param {*} userData
   */
  run: async (client, message, args, userData) => {

    if (!userData)
      return message.reply(
        "Hình như chúng tôi chưa cấu hình tài khoản cho bạn. Hãy dùng lệnh `!start`!"
      );

    const author = message.author.id;
    const balance = await client.xemTien(author);
    const msgKoDuTien = `**${message.author.username}**, bạn không có đủ tiền để mua vật phẩm này!`;

    const getItemInfo = async (itemId, price, itemName, itemType) => {
      if (balance < price * amount) return message.channel.send(msgKoDuTien);
      await client.truTien(author, price * amount);
      if (itemType === 1) await client.addItem(author, itemName, amount, itemType);
      else if (itemType === 2) await client.addItem(author, itemName, amount, itemType);
      else if (itemType === 3) await client.addItem(author, itemName, amount, itemType);
      else if (itemType === 4) await client.addItem(author, itemName, amount, itemType);
      return message.channel.send(`**${message.author.username}**, bạn đã mua thành công ${amount} ${itemName}`);
    };

    if (!args[0])
      return message.channel.send("Cách dùng: `!buy <id> <số lượng>`");

    let buyId = args[0];
    let amount = parseInt(args[1]) || 1;



    switch (buyId) {

      ////////////////////////////////////////////// Hoa
      case '20':
        getItemInfo(buyId, 1000, hoaCacLoai[0], 2)
      case '21':
        getItemInfo(buyId, 2000, hoaCacLoai[1], 2);
        break;
      case '22':
        getItemInfo(buyId, 3000, hoaCacLoai[2], 2);
        break;
      case '23':
        getItemInfo(buyId, 5000, hoaCacLoai[3], 2);
        break;
      case '24':
        getItemInfo(buyId, 10000, hoaCacLoai[4], 2);
        break;

      ////////////////////////////////////////////// Nhẫn
      case '25':
        getItemInfo(buyId, 50000, nhanCacLoai[0], 4);
        break;
      case "26":
        getItemInfo(buyId, 100000, nhanCacLoai[1], 4);
        break;
      case "27":
        getItemInfo(buyId, 150000, nhanCacLoai[2], 4);
        break;

      ////////////////////////////////////////////////////////// Role
      case '28':
        if (balance < 30000) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 30000);
        let role1 = message.guild.roles.cache.find((role) => role.name === "1124062125229346920" || role.id === "1124062125229346920");
        await message.member.roles.add(role1)
        break;
      case '29':
        if (balance < 15000) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 15000);
        let role2 = message.guild.roles.cache.find((role) => role.name === "1125641678913548299" || role.id === "1125641678913548299");
        await message.member.roles.add(role2)
        break;
      case '30':
        if (balance < 50000) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 50000);
        let role3 = message.guild.roles.cache.find((role) => role.name === "1125641802574209055" || role.id === "1125641802574209055");
        await message.member.roles.add(role3)
        break;
      case '31':
        if (balance < 100000) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 100000);
        let role4 = message.guild.roles.cache.find((role) => role.name === "1125641989174595594" || role.id === "1125641989174595594");
        await message.member.roles.add(role4)
        break;

      /////////////////////////////////////////////////// RƯơng
      case '32':
        getItemInfo(buyId, 10000, ruongCacLoai[0], 3);
        break;
      case '33':
        getItemInfo(buyId, 20000, ruongCacLoai[1], 3);
        break;
      case '34':
        getItemInfo(buyId, 30000, ruongCacLoai[2], 3);
        break;
    }

  },
};
