const Discord = require("discord.js");
const itemModel = require("../../database/models/itemModel");

module.exports = {
  name: "use",
  description: "Dùng vật phẩm",
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

    const id = args[0];

    if (!id)
      return message.channel.send(
        `**${message.author.username}**, bạn phải nhập id món đồ cần dùng!`
    );

    const ruongBac = await client.item(message.author.id, "Rương bạc")

    if ( ruongBac < 0) return message.channel.send(`**${message.author.username}**, bạn không còn rương bạc nào!`)

    const moneyRandom = {
        minMoney: 1000,   
        maxMoney: 15000, 
    }

    const randomAmount = Math.floor(Math.random() * (moneyRandom.maxMoney - moneyRandom.minMoney + 1)) + moneyRandom.minMoney
    await message.channel.send(`🎉** | ${message.author.username}**, bạn đã nhận được ${randomAmount} <:O_o:1135831601205481523> coins`)

    await client.addTien(message.author.id, randomAmount)
    await client.truItem(message.author.id, "Rương bạc", 1)
    
  },
};
