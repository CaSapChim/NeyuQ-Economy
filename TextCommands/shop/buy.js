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

    let buyId = args[0];
    let amount = parseInt(args[1]) || 1;
    const author = message.author.id;
    let balance = await client.xemTien(author);
    let msgKoDuTien = `**${message.author.username}**, bạn không có đủ tiền để mua vật phẩm này!`;

    if (!buyId)
      return message.channel.send("Cách dùng: `!buy <id> <số lượng>`");

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

    let msgThanhCong;

    switch (true) {
      case buyId == 1:
        if (balance < 30 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 30 * amount);
        await client.addItem(author, "Cúp gỗ", amount, 1);
        msgThanhCong = cupCacLoai[0];
        break;
      case buyId == 2:
        if (balance < 250 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 250 * amount);
        await client.addItem(author, "Cúp đá", amount, 1);
        msgThanhCong = cupCacLoai[1];
        break;
      case buyId == 3:
        if (balance < 500 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 500 * amount);
        await client.addItem(author, "Cúp sắt", amount, 1);
        msgThanhCong = cupCacLoai[2];
        break;
      case buyId == 4:
        if (balance < 1000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 1000 * amount);
        await client.addItem(author, "Cúp vàng", amount, 1);
        msgThanhCong = cupCacLoai[3];
        break;
      case buyId == 5:
        if (balance < 2000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 2000 * amount);
        await client.addItem(author, "Cúp Kim cương", amount, 1);
        msgThanhCong = cupCacLoai[4];
        break;

      // Bông hoa
      case buyId == 20:
        if (balance < 1000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 1000 * amount);
        await client.addItem(author, "Bông hoa", amount, 2);
        msgThanhCong = hoaCacLoai[0];
        break;

      // Bó bông
      case buyId == 21:
        if (balance < 2000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 2000 * amount);
        await client.addItem(author, "Bó bông", amount, 2);
        msgThanhCong = hoaCacLoai[1];
        break;

      // Cục kẹo
      case buyId == 22:
        if (balance < 3000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 3000 * amount);
        await client.addItem(author, "Cục kẹo", amount, 2);
        msgThanhCong = hoaCacLoai[2];
        break;

      // Socola
      case buyId == 23:
        if (balance < 5000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 5000 * amount);
        await client.addItem(author, "Socola", amount, 2);
        msgThanhCong = hoaCacLoai[3];
        break;

      // Gấu bông
      case buyId == 24:
        if (balance < 10000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 10000 * amount);
        await client.addItem(author, "Gấu bông", amount, 2);
        msgThanhCong = hoaCacLoai[4];
        break;

      // Nhẫn bạc
      case buyId == 25:
        if (balance < 50000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 50000 * amount);
        await client.addNhan(author, "Nhẫn bạc", amount, 1);
        msgThanhCong = nhanCacLoai[0];
        break;

      // Nhẫn vàng
      case buyId == 26:
        if (balance < 100000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 100000 * amount);
        await client.addNhan(author, "Nhẫn vàng", amount, 2);
        msgThanhCong = nhanCacLoai[1];
        break;

      // Nhẫn hồng
      case buyId == 27:
        if (balance < 150000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 150000 * amount);
        await client.addNhan(author, "Nhẫn hồng", amount, 3);
        msgThanhCong = nhanCacLoai[2];
        break;

      ////////////////////////////////////////////////////////// Role
      case buyId == 28:
        if (balance < 15000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 15000);
        let role1 = message.guild.roles.cache.find((role) => role.name === "1124062125229346920" || role.id === "1124062125229346920");
        await message.member.roles.add(role1)
        msgThanhCong = roleCacLoai[0];
        break;
      case buyId == 29:
        if (balance < 30000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 30000);
        let role2 = message.guild.roles.cache.find((role) => role.name === "1125641678913548299" || role.id === "1125641678913548299");
        await message.member.roles.add(role2)
        msgThanhCong = roleCacLoai[1];
        break;
      case buyId == 30:
        if (balance < 50000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 50000);
        let role3 = message.guild.roles.cache.find((role) => role.name === "1125641802574209055" || role.id === "1125641802574209055");
        await message.member.roles.add(role3)
        msgThanhCong = roleCacLoai[2];
        break;
      case buyId == 31:
        if (balance < 100000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 100000);
        let role4 = message.guild.roles.cache.find((role) => role.name === "1125641989174595594" || role.id === "1125641989174595594");
        await message.member.roles.add(role4)
        msgThanhCong = roleCacLoai[3];
        break;

      ///////////////////////////////////////////////////// Rương
      case buyId == 32:
        if (balance < 10000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 10000);
        await client.addItem(author, "Rương bạc", amount, 3)
        msgThanhCong = ruongCacLoai[0];
        break;
      case buyId == 33:
        if (balance < 20000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 20000);
        await client.addItem(author, "Rương vàng", amount, 3)
        msgThanhCong = ruongCacLoai[1];
        break;
      case buyId == 34:
        if (balance < 30000 * amount) return message.channel.send(msgKoDuTien);
        await client.truTien(author, 30000);
        await client.addItem(author, "Rương đặc biệt", amount, 3)
        msgThanhCong = ruongCacLoai[2];
        break;
      default:
        return message.channel.send("ID vật phẩm không hợp lệ");
    }
    message.channel.send(
      `**${message.author.username}**, bạn đã mua thành công ${amount} ${msgThanhCong}`
    );
  },
};
