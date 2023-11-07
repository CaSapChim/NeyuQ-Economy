const Discord = require("discord.js");
const emoji = require('../../emoji.json');

/**
 *          Note
 *                         ---
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

const nhanCacLoai = ['Nhẫn bạc', 'Nhẫn vàng', 'Nhẫn hồng'];

const hoaCacLoai = ["Bông hoa", "Bó bông", "Cục kẹo", "Socola", "Gấu bông"];

const roleCacLoai = [
  "<@&1124062125229346920>",
  "<@&1125641678913548299>",
  "<@&1125641802574209055>",
  "<@&1125641989174595594>",
  '<@&1141981735442186240>'
];

const ruongCacLoai = [
  'Rương bạc',
  'Rương vàng',
  'Rương đặc biệt'
]

module.exports = {
  name: "buy",
  adminOnly: false,
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {*} args
   * @param {*} userData
   */
  run: async (client, message, args, userData) => {
    const author = message.author.id;
    const balance = await client.xemTien(author);
    const msgKoDuTien = `${emoji.fail} Bạn không có đủ tiền để mua vật phẩm này!`;

    let buyId = args[0];
    let amount = parseInt(args[1]) || 1;
    const giaDat = 2000;

    const getItemInfo = async (itemId, price, itemName, itemType) => {
      if ([25, 26, 27, 28, 29, 30, 31, 32].includes(itemId)) amount = 1
      if (balance < price * amount) return message.reply(msgKoDuTien);
      await client.truTien(author, price * amount);
      if (itemType === 1) await client.addItem(author, itemName, amount, itemType);
      else if (itemType === 2) await client.addItem(author, itemName, amount, itemType);
      else if (itemType === 3) await client.addItem(author, itemName, amount, itemType);
      else if (itemType === 4) {
        await client.addItem(author, itemName, amount, itemType);
      }
      return message.reply(`${emoji.success} Bạn đã mua thành công **${amount} ${itemName}** với giá **${(amount * price).toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`);
    };
    
    const getCupInfo = async (price, itemName, itemType) => {
      await client.truTien(author, price * amount);
      if (itemType === 1) await client.addCup(author, itemName, itemType, amount);
      else if (itemType === 2) await client.addCup(author, itemName, itemType, amount);
      else if (itemType === 3) await client.addCup(author, itemName, itemType, amount);
      else if (itemType === 4) await client.addCup(author, itemName, itemType, amount);
      else if (itemType === 5) await client.addCup(author, itemName, itemType, amount);
      return message.reply(`${emoji.success} Bạn đã mua thành công **${amount} ${itemName}** với giá **${(amount * price).toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`);
    };

    const getCauCaInfo = async (price, itemName, itemType) => {
      if (balance < price * amount) return message.reply(msgKoDuTien);
      await client.truTien(author, price * amount);
      if (itemType === 1) await client.addToolCC(author, itemName, itemType, amount);
      else if (itemType === 2) await client.addToolCC(author, itemName, itemType, amount);
      else if (itemType === 3) await client.addToolCC(author, itemName, itemType, amount);
      else if (itemType === 4) await client.addToolCC(author, itemName, itemType, amount);
      else if (itemType === 5) await client.addToolCC(author, itemName, itemType, amount);
      return message.reply(`${emoji.success} Bạn đã mua thành công **${amount} ${itemName}** với giá **${(amount * price).toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`);
    }

    const getNongSanInfo = async (price, itemName) => {
      if (balance < price * amount) return message.reply(msgKoDuTien);
      await client.truTien(author, price * amount);
      await client.addNongSan(author, itemName, amount);
      return message.reply(`${emoji.success} Bạn đã mua thành công **${amount} ${itemName}** với giá **${(amount * price).toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`);
    }

    const getAnimaInfo = async (price, itemName) => {
      if (balance < price * amount) return message.reply(msgKoDuTien);
      await client.truTien(author, price * amount);
      await client.addAnimal(author, itemName, amount);
      return message.reply(`${emoji.success} Bạn đã mua thành công **${amount} ${itemName}** với giá **${(amount * price).toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`);
    }

    if (!args[0])
      return message.reply("Cách dùng: `buy <id> <số lượng>`");

    const a = await client.item(message.author.id, "Nhẫn bạc") // Ghi sai chính tả thì có nịt mà lưu db
    const b = await client.item(message.author.id, "Nhẫn vàng")
    const c = await client.item(message.author.id, "Nhẫn hồng")

    switch (buyId) {

      ////////////////////////////////////////////// Hoa
      case '20':
        getItemInfo(buyId, 1500, hoaCacLoai[0], 2)
        break;
      case '21':
        getItemInfo(buyId, 3000, hoaCacLoai[1], 2);
        break;
      case '22':
        getItemInfo(buyId, 5000, hoaCacLoai[2], 2);
        break;
      case '23':
        getItemInfo(buyId, 8000, hoaCacLoai[3], 2);
        break;
      case '24':
        getItemInfo(buyId, 12000, hoaCacLoai[4], 2);
        break;

      ////////////////////////////////////////////// Nhẫn
      case '25':
        if (a || b || c) return message.reply('**Bạn chỉ được sở hữu một loại nhẫn duy nhất\nHãy bán đi nếu muốn mua loại nhẫn khác!\n`Cách bán: sell <id> soluong`**')
        getItemInfo(buyId, 80000, nhanCacLoai[0], 4);
        break;
      case "26":
        if (a || b || c) return message.reply('**Bạn chỉ được sở hữu một loại nhẫn duy nhất\nHãy bán đi nếu muốn mua loại nhẫn khác!\n`Cách bán: sell <id> soluong`**')
        getItemInfo(buyId, 150000, nhanCacLoai[1], 4);
        break;
      case "27":
        if (a || b || c) return message.reply('**Bạn chỉ được sở hữu một loại nhẫn duy nhất\nHãy bán đi nếu muốn mua loại nhẫn khác!\n`Cách bán: sell <id> soluong`**')
        getItemInfo(buyId, 200000, nhanCacLoai[2], 4);
        break;

      ////////////////////////////////////////////////////////// Role
      case '28':
        if (balance < 25000) return message.reply(msgKoDuTien);
        await client.truTien(author, 25000);
        let role1 = message.guild.roles.cache.find((role) => role.name === "1124062125229346920" || role.id === "1124062125229346920");
        await message.member.roles.add(role1)
        let roleEmbed1 = new Discord.EmbedBuilder()
          .setDescription(`**<:very:1137010214835597424> | ${message.author.username}**, Bạn đã mua thành công role ${roleCacLoai[0]}`)
        await message.reply({ embeds: [roleEmbed1] })
        break; 
      case '29':  
        if (balance < 50000) return message.reply(msgKoDuTien);
        await client.truTien(author, 50000);
        let role2 = message.guild.roles.cache.find((role) => role.name === "1125641678913548299" || role.id === "1125641678913548299");
        await message.member.roles.add(role2)
        let roleEmbed2 = new Discord.EmbedBuilder()
          .setDescription(`**<:very:1137010214835597424> | ${message.author.username}**, Bạn đã mua thành công role ${roleCacLoai[1]}`)
        await message.reply({ embeds: [roleEmbed2] })
        break;
      case '30':
        if (balance < 100000) return message.reply(msgKoDuTien);
        await client.truTien(author, 100000);
        let role3 = message.guild.roles.cache.find((role) => role.name === "1125641802574209055" || role.id === "1125641802574209055");
        await message.member.roles.add(role3)
        let roleEmbed3 = new Discord.EmbedBuilder()
        .setDescription(`**<:very:1137010214835597424> | ${message.author.username}**, Bạn đã mua thành công role ${roleCacLoai[2]}`)
      await message.reply({ embeds: [roleEmbed3] })
        break;
      case '31':
        if (balance < 150000) return message.reply(msgKoDuTien);
        await client.truTien(author, 150000);
        let role4 = message.guild.roles.cache.find((role) => role.name === "1125641989174595594" || role.id === "1125641989174595594");
        await message.member.roles.add(role4)
        let roleEmbed4 = new Discord.EmbedBuilder()
          .setDescription(`**<:very:1137010214835597424> | ${message.author.username}**, Bạn đã mua thành công role ${roleCacLoai[3]}`)
        await message.reply({ embeds: [roleEmbed4] })
        break;
      case '32':
        if (balance < 300000) return message.reply(msgKoDuTien);
        await client.truTien(author, 300000);
        let role5 = message.guild.roles.cache.find((role) => role.name === "1141981735442186240" || role.id === "1141981735442186240");
        await message.member.roles.add(role5)
        let roleEmbed5 = new Discord.EmbedBuilder()
          .setDescription(`**<:very:1137010214835597424> | ${message.author.username}**, Bạn đã mua thành công role ${roleCacLoai[4]}`)
        await message.reply({ embeds: [roleEmbed5] })
        break;


      /////////////////////////////////////////////////// Rương
      case '35':
        getItemInfo(buyId, 15000, ruongCacLoai[0], 3);
        break;
      case '36':
        getItemInfo(buyId, 30000, ruongCacLoai[1], 3);
        break;
      case '37':
        getItemInfo(buyId, 50000, ruongCacLoai[2], 3);
        break;

      //////////////////////////////////////////////////////////CÚP
      case '40':
        getCupInfo(buyId, 1000, cupCacLoai[0], 1)
        break;
      case '41':
        getCupInfo(buyId, 2000, cupCacLoai[1], 2)
        break;
      case '42':
        getCupInfo(buyId, 5000, cupCacLoai[2], 3)
        break;
      case '43':
        getCupInfo(buyId, 10000, cupCacLoai[3], 4)
        break;
      case '44':
        getCupInfo(buyId, 15000, cupCacLoai[4], 5)
        break;
      case '50':
        getCauCaInfo(buyId, 1000, "Cần câu tre", 1) 
        break;
      case '51':
        getCauCaInfo(buyId, 2000, "Cần câu xịn", 2)
        break;
      case '52':
        getCauCaInfo(buyId, 5000, "Lưới", 3)
        break;
      case '53':
        getCauCaInfo(buyId, 10000, "Lưới vip", 4)
        break;
      case '60':
        getNongSanInfo(5, "hạt lúa");
        break;
      case '61':
        getNongSanInfo(5, "hạt đậu");
        break;
      case '62':
        getNongSanInfo(5, "hạt bí");
        break;
      case '63':
        getNongSanInfo(5, "hạt dưa hấu");
        break;
      case '64':
        getNongSanInfo(5, "khoai tây");
        break;
      case '65':
        getNongSanInfo(5, "cà rốt");
        break;
      case '66':
        if (balance < amount * giaDat) return message.reply(msgKoDuTien);
        client.addDat(author, amount);
        client.truTien(author, amount * giaDat);
        message.reply(`${emoji.success} Bạn đã mua thành công **${amount} mảnh đất <:hand_with_plant:1155701041329872978>** với giá **${(amount * giaDat).toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`);
        break;
      case '70':
        getAnimaInfo(10000, "bò");
        break;
      case '71':
        getAnimaInfo(10000, "gà");
        break;
      case '72':
        getAnimaInfo(10000, "heo");
        break;
      default:
        message.reply('**Không tìm thấy ID của sản phẩm**')
    }

  },
};
