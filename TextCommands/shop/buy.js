const Discord = require("discord.js");
const emoji = require('../../emoji.json');
const data = require('../../data/price.json');

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
  description: "Mua vật phẩm từ shop",
  cooldown: 3,
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
    const giaDat = data.farm.dat;

    const getItemInfo = async (itemId, price, itemName, itemType) => {
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

    const a = await client.item(message.author.id, "Nhẫn bạc"); // Ghi sai chính tả thì có nịt mà lưu db
    const b = await client.item(message.author.id, "Nhẫn vàng");
    const c = await client.item(message.author.id, "Nhẫn hồng");

    switch (buyId) {

      ////////////////////////////////////////////// Hoa
      case '20':
        getItemInfo(buyId, data.taphoa.bonghoa, hoaCacLoai[0], 2)
        break;
      case '21':
        getItemInfo(buyId, data.taphoa.bobong, hoaCacLoai[1], 2);
        break;
      case '22':
        getItemInfo(buyId, data.taphoa.cuckeo, hoaCacLoai[2], 2);
        break;
      case '23':
        getItemInfo(buyId, data.taphoa.socola, hoaCacLoai[3], 2);
        break;
      case '24':
        getItemInfo(buyId, data.taphoa.gaubong, hoaCacLoai[4], 2);
        break;

      ////////////////////////////////////////////// Nhẫn
      case '25':
        if (a || b || c) return message.reply('**Bạn chỉ được sở hữu một loại nhẫn duy nhất\nHãy bán đi nếu muốn mua loại nhẫn khác!\n`Cách bán: sell <id> soluong`**')
        getItemInfo(buyId, data.taphoa.nhanbac, nhanCacLoai[0], 4);
        break;
      case "26":
        if (a || b || c) return message.reply('**Bạn chỉ được sở hữu một loại nhẫn duy nhất\nHãy bán đi nếu muốn mua loại nhẫn khác!\n`Cách bán: sell <id> soluong`**')
        getItemInfo(buyId, data.taphoa.nhanvang, nhanCacLoai[1], 4);
        break;
      case "27":
        if (a || b || c) return message.reply('**Bạn chỉ được sở hữu một loại nhẫn duy nhất\nHãy bán đi nếu muốn mua loại nhẫn khác!\n`Cách bán: sell <id> soluong`**')
        getItemInfo(buyId, data.taphoa.nhanhong, nhanCacLoai[2], 4);
        break;

      /////////////////////////////////////////////////// Rương
      case '35':
        getItemInfo(buyId, data.taphoa.ruongbac, ruongCacLoai[0], 3);
        break;
      case '36':
        getItemInfo(buyId, data.taphoa.ruongvang, ruongCacLoai[1], 3);
        break;
      case '37':
        getItemInfo(buyId, data.taphoa.ruongdacbiet, ruongCacLoai[2], 3);
        break;

      //////////////////////////////////////////////////////////CÚP
      case '40':
        getCupInfo(data.tool.cupgo, cupCacLoai[0], 1)
        break;
      case '41':
        getCupInfo(data.tool.cupda, cupCacLoai[1], 2)
        break;
      case '42':
        getCupInfo(data.tool.cupsat, cupCacLoai[2], 3)
        break;
      case '43':
        getCupInfo(data.tool.cupvang, cupCacLoai[3], 4)
        break;
      case '44':
        getCupInfo(data.tool.cupkimcuong, cupCacLoai[4], 5)
        break;
      case '50':
        getCauCaInfo(data.tool.cancautre, "Cần câu tre", 1) 
        break;
      case '51':
        getCauCaInfo(data.tool.cancauxin, "Cần câu xịn", 2)
        break;
      case '52':
        getCauCaInfo(data.tool.luoi, "Lưới", 3)
        break;
      case '53':
        getCauCaInfo(data.tool.luoivip, "Lưới vip", 4)
        break;
      case '60':
        getNongSanInfo(data.farm.hatlua, "hạt lúa");
        break;
      case '61':
        getNongSanInfo(data.farm.hatdau, "hạt đậu");
        break;
      case '62':
        getNongSanInfo(data.farm.hatbi, "hạt bí");
        break;
      case '63':
        getNongSanInfo(data.farm.hatduahau, "hạt dưa hấu");
        break;
      case '64':
        getNongSanInfo(data.farm.khoaitay, "khoai tây");
        break;
      case '65':
        getNongSanInfo(data.farm.carot, "cà rốt");
        break;
      case '66':
        if (balance < amount * giaDat) return message.reply(msgKoDuTien);
        client.addDat(author, amount);
        client.truTien(author, amount * giaDat);
        message.reply(`${emoji.success} Bạn đã mua thành công **${amount} mảnh đất <:hand_with_plant:1155701041329872978>** với giá **${(amount * giaDat).toLocaleString('En-Us')} <:O_o:1135831601205481523> coins**`);
        break;
      case '70':
        getAnimaInfo(data.farm.bo, "bò");
        break;
      case '71':
        getAnimaInfo(data.farm.ga, "gà");
        break;
      case '72':
        getAnimaInfo(data.farm.heo, "heo");
        break;
      // case 'gacharole':
      //   let userDataGacha = await gachaUserModel.findOne({ userId: author });
      //   if (!userDataGacha) {
      //     userDataGacha = await gachaUserModel.create({ userId: author });
      //     if (balance < amount * data.vegacha) return message.reply(`${emoji.fail} Bạn không đủ tiền để mua`);
      //     await client.truTien(author, data.vegacha * amount);
      //     userDataGacha.soLuong += amount;
      //     await userDataGacha.save();
      //   }
      //   break;
      default:
        message.reply('**Không tìm thấy ID của sản phẩm**')
    }
  },
};
