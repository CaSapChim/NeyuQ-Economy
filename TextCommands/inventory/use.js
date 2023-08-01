const Discord = require("discord.js");

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
    let soluong = parseInt(args[1]);

    if (!id)
    return message.channel.send(
      `**${message.author.username}**, bạn phải nhập id món đồ cần dùng!`
    );
  if (soluong < 0)
    return message.channel.send(
      `**${message.author.id}**, bạn không thể nhập số âm`
    );

    if (id == "ruongbac" || id == "109") {
      const ruongBacItem = [
        "2,000 coins <:O_o:1135831601205481523>",
        "15,000 coins <:O_o:1135831601205481523>",
        "1,500 coins <:O_o:1135831601205481523>",
        "5,500 coins <:O_o:1135831601205481523>",
        "10,000 coins <:O_o:1135831601205481523>",
        "20,000 coins <:O_o:1135831601205481523>",
      ];

      const ruongBac = await client.item(message.author.id, "Rương bạc");

      if (ruongBac < 0)
        return message.channel.send(
          `**${author.username}**, bạn không có rương bạc nào để dùng`
        );

      if (!soluong && ruongBac > 0) soluong = 1;
      if (soluong > 10) soluong = 10
      if (args[1] == `all`) soluong = ruongBac
    
      console.log(soluong)
      let arr = [];
      if (soluong > 0) {
        for (var i = 0; i < soluong; i++) {
          let r = ruongBacItem[Math.floor(Math.random() * ruongBacItem.length)];
          arr[i] = r;
          if ( r = ruongBacItem[0]) await client.addTien(message.author.id, 2000)
        }
        let count = {};
        arr.forEach((item) => {
          if (count[item]) {
            count[item] += 1;
            return;
          }
          count[item] = 1;
        });

        await client.truItem(message.author.id, "Rương bạc", soluong)
        await message.channel.send(
          `**${
            message.author.username
          }**, bạn đã mở rương bạc và nhận được:\n${arr.join("\n")}`
        );
      }
    }

  },
};
