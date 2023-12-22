const Discord = require("discord.js");
const emoji = require('../../emoji.json');

module.exports = {
  name: "use",
  adminOnly: false,
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
    let amount = args[1];

    if (!id || !amount)
      return message.reply(
        `Cách dùng: **\`nqg use <id> <số lượng>\`**`
    );

    if (amount < 1 || (isNaN(amount) && amount !== "all")) 
      return message.reply(`${emoji.fail} Phắc du <@${message.author.id}> sai định dạng rồi`)
      .then(msg => setTimeout(() => {
        msg.delete();
      }, 5000));


    if ( id === '109') {
      const ruongBac = await client.item(message.author.id, "Rương bạc")
      if (amount === "all") amount = ruongBac;  
      if ( ruongBac < amount || ruongBac == 0) return message.reply(`${emoji.fail} Bạn không còn rương bạc nào!`)

      let sum = 0;
      for (let i = 1; i <= amount; i++) {
        const moneyRandom = {
            minMoney: 5000,   
            maxMoney: 20000, 
          }
        const randomAmount = Math.floor(Math.random() * (moneyRandom.maxMoney - moneyRandom.minMoney + 1)) + moneyRandom.minMoney
        console.log(randomAmount);
        sum += randomAmount;
        }

      await message.channel.send(`${emoji.congra} **|** <@${message.author.id}> mở **${amount} rương bạc** và nhận được **${sum.toLocaleString('en-Us')}** ${emoji.coin} coins`)

      await client.addTien(message.author.id, sum)
      await client.truItem(message.author.id, "Rương bạc", amount)
    } 

    else if ( id === '110') {
      const ruongVang = await client.item(message.author.id, "Rương vàng")
      if (amount === "all") amount = ruongVang;
      if (ruongVang < amount || ruongVang == 0) return message.reply(`${emoji.fail} Bạn không còn rương vàng nào!`)

      const item = [
        'Bó bông',   
        'Bông hoa',     // 20 bông hoa | 12 bó bông | 6 kẹo | 3 socola | 2 Gấu 
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
        'Bó bông',
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
        minMoney: 20000,   
        maxMoney: 40000, 
      }
      let sum = 0;
      let arr = [];
      for (let i = 1; i <= amount; i++) {
        const randomAmount = Math.floor(Math.random() * (moneyRandom.maxMoney - moneyRandom.minMoney + 1)) + moneyRandom.minMoney;``
        const randomItem = Math.floor(Math.random() * item.length);
        sum += randomAmount;
        arr.push(item[randomItem]);
        await client.addItem(message.author.id, item[randomItem], 1, 2);
      }

      let msg = ``;
      arr.forEach(i => {
        msg += `${emojis[i]} `;
      })
      await message.channel.send(`${emoji.congra} **|** <@${message.author.id}> đã mở **${amount} rương vàng** và nhận được:\n${sum.toLocaleString('en-Us')} ${emoji.coin}\n${msg}`)
      
      await client.addTien(message.author.id, sum);
      await client.truItem(message.author.id, 'Rương vàng', amount)

    }
    else if ( id === '111') {
      const ruongDacBiet = await client.item(message.author.id, "Rương đặc biệt");
      if (amount === "all") amount = ruongDacBiet;
      if (ruongDacBiet < amount || amount == 0) return message.reply(`${emoji.fail} Bạn không còn rương đặc biệt nào!`);

      const itemRandom = [
        'Tình Yêu Cháy Bỏng', 
        'Tình Yêu Cháy Bỏng', 
        'Huy Hiệu Tri Kỉ',
        'Huy Hiệu Thân Thiết',
        'Tình Yêu Cháy Bỏng', 
        'Tri Kỉ Valentine', 
        'Tình Yêu Cháy Bỏng', 
        'Huy Hiệu VDay',
        'Huy Hiệu Thân Thiết',
        'Huy Hiệu VDay',
        'Tình Yêu Cháy Bỏng', 
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
        maxMoney: 70000, 
      }

      let msg = ``;
      let arr = [];
      let sum = 0;
      for (let i = 1; i<= amount; i++) {
        const randomAmount = Math.floor(Math.random() * (moneyRandom.maxMoney - moneyRandom.minMoney + 1)) + moneyRandom.minMoney
        const result = Math.floor(Math.random() * itemRandom.length)
        sum += randomAmount;
        arr.push(itemRandom[result]);
        await client.addItem(message.author.id, itemRandom[result], 1, 5);
      }

      arr.forEach(i => {
        msg += `${emojis[i]} `;
      })
      await message.channel.send(`${emoji.congra} **|** <@${message.author.id}> đã mở **${amount} rương đặc biệt** và nhận được:\n${sum.toLocaleString('en-Us')} ${emoji.coin}\n${msg}`)
      

      await client.addTien(message.author.id, sum)
      await client.truItem(message.author.id, 'Rương đặc biệt', amount)
  } 

  const emojiCup = {
    "Cúp gỗ": "<:wooden_pickaxe:1134750444854444042>",
    "Cúp đá": "<:905609866691891220:1134749977529299014>",
    "Cúp sắt": "<:mcmine:1134750599188062350>",
    "Cúp vàng": "<:Gold_Pickaxe:1134749444785578034>",
    "Cúp kim cương": "<:diamond_pickaxe:1134749671613550592>"
  }

  const emojiCa = {
    "Cần câu tre": "<:Flimsy_Fishing_Rod_NH_Icon:1140523577821626438>",
    "Cần câu xịn": "<:pro_fishing_rod49:1140523548763500665>",
    "Lưới": "<:Flimsy_Net_NH_Icon:1140523599170654298>",
    "Lưới vip": "<:Golden_Net_NH_Inv_Icon:1140523506656874496>"
  }

  let cup1 = await client.cup(message.author.id, "Cúp gỗ")
  let cup2 = await client.cup(message.author.id, "Cúp đá")
  let cup3 = await client.cup(message.author.id, "Cúp sắt")
  let cup4 = await client.cup(message.author.id, "Cúp vàng")
  let cup5 = await client.cup(message.author.id, "Cúp kim cương")

  async function cup(nameCup, soLuongBuff, type) {
    for (let i = 1; i < 6; i++) {
      let buff = await client.buffMine(message.author.id, i)
      if ( buff > 0 ) return message.reply(`**Bạn không thể dùng cúp khác khi cúp hiện tại chưa sử dụng xong!**`)
    }
    await client.addBuffMine(message.author.id, soLuongBuff, type)
    await client.truCup(message.author.id, nameCup, 1)
    message.reply(`Bạn đã sử dụng thành công 1 **${nameCup} ${emojiCup[nameCup]}**`)
  }



  if (id === '200' || id === 'cupgo') {
    if (cup1 < 1) return message.reply('Bạn không có **cúp gỗ** <:wooden_pickaxe:1134750444854444042> nào để dùng!')
    await cup("Cúp gỗ", 25, 1)
  } 
  
  else if (id === '201' || id === 'cupda') {
    if (cup2 < 1) return message.reply('Bạn không có **cúp đá** <:905609866691891220:1134749977529299014> nào để dùng!')
    await cup("Cúp đá", 50, 2)
  } 
  
  else if (id === '202' || id === 'cupsat') {
    if (cup3 < 1) return message.reply('Bạn không có **cúp sắt** <:mcmine:1134750599188062350 nào để dùng!')
    await cup("Cúp sắt", 100, 3)
  }
  
  else if (id === '203' || id === 'cupvang') {
    if (cup4 < 1) return message.reply('Bạn không có **cúp vàng** <:Gold_Pickaxe:1134749444785578034> nào để dùng!')
    await cup("Cúp vàng", 200, 4)
  }
  
  else if (id === '204' || id === 'cupkimcuong' || id === 'cupkc' ) {
    if (cup5 < 1) return message.reply('Bạn không có **cúp kim cương** <:diamond_pickaxe:1134749671613550592> nào để dùng!')
    await cup("Cúp kim cương", 300, 5)
  }

  let canCauTre = await client.toolCauCa(message.author.id, "Cần câu tre")
  let canCauXin = await client.toolCauCa(message.author.id, "Cần câu xịn")
  let luoi= await client.toolCauCa(message.author.id, "Lưới")
  let luoiVip = await client.toolCauCa(message.author.id, "Lưới vip")

  async function cauca(toolCauCa, soLuongBuff, type) {
    for (let i = 1; i < 5; i++) {
      let buff = await client.buffCauCa(message.author.id, i)
      if ( buff > 0 ) return message.reply(`**Bạn không thể dùng dụng cụ câu cá khác khi dụng cụ hiện tại chưa sử dụng xong!**`)
    }
    await client.addBuffCauCa(message.author.id, soLuongBuff, type)
    await client.truToolCC(message.author.id, toolCauCa, 1)
    message.reply(`Bạn đã sử dụng thành công 1 **${toolCauCa} ${emojiCa[toolCauCa]}**`)
  }

  if (id === '210' || id === 'cancautre') {
    if ( canCauTre < 1) return message.reply('Bạn không có **Cần câu tre** <:Flimsy_Fishing_Rod_NH_Icon:1140523577821626438> nào để dùng!')
    await cauca("Cần câu tre", 10, 1)
  } 
  
  else if (id === '211' || id === 'cancauxin') {
    if ( canCauXin < 1) return message.reply('Bạn không có **Cần câu xịn** <:pro_fishing_rod49:1140523548763500665> nào để dùng!')
    await cauca("Cần câu xịn", 20, 2)
  } 
  
  else if (id === '212' || id === 'luoi') {
    if ( luoi < 1) return message.reply('Bạn không có **Lưới** <:Flimsy_Net_NH_Icon:1140523599170654298> nào để dùng!')
    await cauca("Lưới", 50, 3)
  }
  
  else if (id === '213' || id === 'luoivip') {
    if ( luoiVip < 1) return message.reply('Bạn không có **Lưới vip** <:Golden_Net_NH_Inv_Icon:1140523506656874496> nào để dùng**')
    await cauca("Lưới vip", 100, 4)
  }
}
};

