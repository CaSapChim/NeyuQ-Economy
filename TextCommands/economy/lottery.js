const { EmbedBuilder } = require("discord.js");
const xoSoUserModel = require('../../database/models/xoSoUserModel')

module.exports = {
  name: "veso",
  aliases: ["vs"],
  description: "Mua vé số",
  run: async (client, message, args, userData) => {
    const price = 10000;

    let amount = parseInt(args[0]) ? parseInt(args[0]) : 10;
    
    let data = await xoSoUserModel.findOne({
        userId: message.author.id
    })

    if (!data) data = new xoSoUserModel({ userId: message.author.id, soLuong: []})

    let arr = data.soLuong

    for (let i = 0; i < amount; i++) {
        arr.push(Math.floor(Math.random() * 1e6));
    }
    await data.save()
    
    const success = arr
      ? new EmbedBuilder().setAuthor({
          name: `Bạn đã mua thành công ${arr.length} vé số`,
        })
      : new EmbedBuilder().setAuthor({ name: `Có lỗi khi mua hàng!` });
    await message.reply({ embeds: [success] });
  },
};
