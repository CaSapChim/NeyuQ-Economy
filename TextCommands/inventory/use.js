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

    const id = args[0];

    if (!id)
      return message.channel.send(
        `**${message.author.username}**, bạn phải nhập id món đồ cần dùng!`
    );

    if ( id === '109' || id === 'ruongbac') {
      const ruongBac = await client.item(message.author.id, "Rương bạc")
      if ( ruongBac < 1) return message.channel.send(`**${message.author.username}**, bạn không còn rương bạc nào!`)

      const moneyRandom = {
          minMoney: 5000,   
          maxMoney: 20000, 
      }

      const randomAmount = Math.floor(Math.random() * (moneyRandom.maxMoney - moneyRandom.minMoney + 1)) + moneyRandom.minMoney
      await message.channel.send(`🎉** | ${message.author.username}**, bạn đã nhận được ${randomAmount.toLocaleString('en-Us')} <:O_o:1135831601205481523> coins`)

      await client.addTien(message.author.id, randomAmount)
      await client.truItem(message.author.id, "Rương bạc", 1)
    } 

    else if ( id === '110' || id === 'ruongvang') {
      const ruongVang = await client.item(message.author.id, "Rương vàng")
      if (ruongVang < 1) return message.channel.send(`**${message.author.username}**, bạn không còn rương vàng nào!`)

      const itemRandom = [
        'Bó bông',   
        'Bông hoa',     // 20 bông hoa | 10 bó bông | 6 kẹo | 3 socola | 2 Gấu 
        'Bó bông',
        'Cục kẹo',
        'Socola',
        'Gấu bông',
        'Bông hoa',
        'Bông hoa',
        'Bông hoa',
        'Bông hoa',
        'Bông hoa',
        'Bông hoa',
        'Bó bông',
        'Cục kẹo',
        'Bông hoa',
        'Bó bông',
        'Bó bông',
        'Bông hoa',
        'Socola',
        'Gấu bông',
        'Bó bông',
        'Cục kẹo',
        'Bó bông',
        'Cục kẹo',
        'Cục kẹo',
        'Bông hoa',
        'Bông hoa',
        'Bông hoa',
        'Bông hoa',
        'Bông hoa',
        'Bó bông',
        'Bó bông',
        'Bó bông',
        'Cục kẹo',
        'Socola', 
        'Bông hoa',
        'Bó bông', // TAI NGHE HET PIN CMNR
        'Bông hoa',
        'Cục kẹo',
        'Bông hoa',
        'Bông hoa',
        'Bông hoa',
        'Bông hoa',
        'Bó bông',
        'Cục kẹo',
      ]

      const emojis = {
        'Bông hoa': '<a:p_flower22:1135636392374960310>',
        'Bó bông': '<:bbng:1124017699614371890>',
        'Cục kẹo': '<:ko:1124018356949884928>',
        'Socola': '<:socola:1124018847511478372>',
        'Gấu bông': '<:gubng:1124018585275211867>'
      }

      const moneyRandom = {
        minMoney: 10000,   
        maxMoney: 25000, 
    }

      const randomAmount = Math.floor(Math.random() * (moneyRandom.maxMoney - moneyRandom.minMoney + 1)) + moneyRandom.minMoney

      const result = Math.floor(Math.random() * itemRandom.length)
      message.channel.send(`🎉** | ${message.author.username}**, bạn đã mở rương vàng và nhận được\n**${itemRandom[result]} ${emojis[itemRandom[result]]}**\n${randomAmount.toLocaleString('en-Us')} <:O_o:1135831601205481523> coins`)

      await client.addTien(message.author.id, randomAmount)
      await client.addItem(message.author.id, itemRandom[result], 1, 2)
      await client.truItem(message.author.id, 'Rương vàng', 1)

    }
    else if ( id === '111' || id === 'ruongdacbiet') {
      const ruongDacBiet = await client.item(message.author.id, "Rương đặc biệt")
      if (ruongDacBiet < 1) return message.channel.send(`**${message.author.username}**, bạn không còn rương vàng nào!`)

      const itemRandom = [
        'Tình Yêu Cháy Bỏng', 
        'Huy Hiệu Tri Kỉ',
        'Huy Hiệu Thân Thiết',
        'Tri Kỉ Valentine', //  
        'Huy Hiệu VDay',
        'Huy Hiệu Cặp Đôi',
      ]

      const emojis = {
        'Tình Yêu Cháy Bỏng': '<:tinhyeuchaybong:1136568485166718986>',
        'Huy Hiệu Tri Kỉ': '<:trik:1122444231223558174>',
        'Huy Hiệu Thân Thiết': '<:banbe:1136575697909989426>',
        'Tri Kỉ Valentine': '<:triki:1136577819409907793>',
        'Huy Hiệu VDay': '<:valnetine:1136578277570510929>',
        'Huy Hiệu Cặp Đôi': '<:trikivalentine:1136577479679688815>' ,
      }

      const moneyRandom = {
        minMoney: 10000,   
        maxMoney: 20000, 
      }

      const randomAmount = Math.floor(Math.random() * (moneyRandom.maxMoney - moneyRandom.minMoney + 1)) + moneyRandom.minMoney
      const result = Math.floor(Math.random() * itemRandom.length)
      message.channel.send(`🎉** | ${message.author.username}**, Bạn đã mở rương đặc biệt và nhận được\n**${itemRandom[result]} ${emojis[itemRandom[result]]}**\n${randomAmount.toLocaleString('en-Us')} <:O_o:1135831601205481523> coins`)

      await client.addTien(message.author.id, randomAmount)
      await client.addItem(message.author.id, itemRandom[result], 1, 5)
      await client.truItem(message.author.id, 'Rương đặc biệt', 1)

  }
}
};

