const Discord = require("discord.js");

module.exports = {
  name: "buytt",
  cooldown: 5,
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {*} args
   */
  run: async (client, message, args) => {
    const item = args[0];
    let soLuong = parseInt(args[1]);
    if (soLuong < 0 || !soLuong) soLuong = 1;
    const author = message.author.id;
    const balance = await client.xemTien(author);

    const itemEmoji = {
      "hạt lúa": '<:seeds97:1155701097806180372>',
      "hạt bí": '<:gourdpumpkinseedspeeledshellisol:1155704854606532709> ',
      "hạt đậu": '<:daunh_1:1156608655060381760>',
      "con bò": '<:3331_minecraft_cow:1156555169396428830>',
      "con gà": '<:Chicken17:1156557573219168307>',
      "lồng đèn": '<:longDenNgoiSao:1156949930632560701>',
      "thỏ bông": '<:thoBongTT:1156949943001559120>',
      "thỏ cung trăng": '<:thoCungTrang:1156964829064597504>',
      "lạp xưởng": '<:lapXuongTT:1157319283341283348>',
      "bơ": '<:butter:1157312769234845736>',
    }

    if (item == "1111" || item == "lua") await buyItem(item, soLuong, 5);
    if (item == "1112" || item == "dau") await buyItem(item, soLuong, 5);
    if (item == "1113" || item == "bi") await buyItem(item, soLuong, 5);
    if (item == "1200" || item == "bo") await buyAnimal(item, soLuong, 10000);
    if (item == "1201" || item == "ga") await buyAnimal(item, soLuong, 10000);
    if (item == "1300" || item == "thobong") await buyItem(item, soLuong, 15000);
    if (item == "1301" || item == "longden") await buyItem(item, soLuong, 20000);
    if (item == "1302" || item == "thocungtrang") await buyItem(item, soLuong, 30000);
    if (item == "1400" || item == "lapxuong") await buyItem(item, soLuong, 1000);
    if (item == "1401" || item == "bo") await buyItem(item, soLuong, 3000);

    async function buyItem(item, soLuong, price) {
      if (balance < soLuong * price)
        return message.reply("Bạn không đủ tiền để mua vật phẩm này!");
      await message.reply(
        `<:very:1137010214835597424> Bạn đã mua thành công **${soLuong} ${checkItem(item)} ${itemEmoji[checkItem(item)]}**`
      );
      await client.addNongSan(author, checkItem(item), soLuong);
      await client.truTien(author, soLuong * price);
    }

    async function buyAnimal(item, soLuong, price) {
      if (balance < soLuong * price)
        return message.reply("Bạn không đủ tiền để mua vật phẩm này!");
      await message.reply(
        `<:very:1137010214835597424> Bạn đã mua thành công **${soLuong} ${checkItem(
          item
        )} ${itemEmoji[checkItem(item)]}**`
      );
      await client.addAnimal(author, checkItem(item), soLuong);
      await client.truTien(author, soLuong * price);
    }

    function checkItem(item) {
      if (item == "lua" || item == "1111") return (item = "hạt lúa");
      if (item == "dau" || item == "1112") return (item = "hạt đậu");
      if (item == "bi" || item == "1113") return (item = "hạt bí");
      if (item == "bo" || item == "1200") return (item = "con bò");
      if (item == "ga" || item == "1201") return (item = "con gà");
      if (item == "longden" || item == "1301") return (item = "lồng đèn");
      if (item == "thobong" || item == "1300") return (item = "thỏ bông");
      if (item == "thocungtrang" || item == "1302") return (item = "thỏ cung trăng");
      if (item == "lapxuong" || item == "1400") return (item = "lạp xưởng");
      if (item == "bo" || item == "1401") return (item = "bơ");
    }
  },
};
