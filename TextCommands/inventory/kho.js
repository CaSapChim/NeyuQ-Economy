const Discord = require('discord.js')

module.exports = {
    name: "kho",
    aliases: ["ks", "khoangsan"],
    description: "Xem các loại khoáng sản trong kho của bạn",
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
      const userInv = userData.inventory;
      
      // Function to get the quantity of a specific item in the inventory
      const getItemQuantity = (itemName) => {
        const itemArr = userInv.filter((item) => item.name === itemName);
        return itemArr.length > 0 ? itemArr[0].soLuong : 0;
      };    
  
      const countVang = getItemQuantity("Vàng");
      const countSat = getItemQuantity("Sắt");
      const countThan = getItemQuantity("Than");
      const countNgocLucBao = getItemQuantity("Ngọc lục bảo");
      const countKimCuong = getItemQuantity("Kim cương");

      const khoangSanEmbed = new Discord.EmbedBuilder()
      .setColor(0xff9900)
      .setTitle(`Kho khoáng sản của ${message.author.username}`)
      .setDescription(
          `${`<:905609870114439208:1134500336862765138> Than: ${countThan}\n`}` +
          `${`<:842601384561868810:1134500649548124161> Sắt: ${countSat}\n`}` +
          `${`<:905609869485289482:1134500596871868588> Vàng: ${countVang}\n`}` +
          `${`<:943215979935187074:1134500706095743150> Kim cương: ${countKimCuong}\n`}` +
          `${`<:905609867769839637:1134500619898593380> Ngọc lục bảo: ${countNgocLucBao}\n`}`
      )
      .setTimestamp();
      message.channel.send({ embeds: [khoangSanEmbed] })
    }
}