const Discord = require("discord.js");
const fishData = require("../../data/fish.json");
const timeModelTest = require('../../database/models/timeModel');
const buffCauCaModel = require("../../database/models/buffCauCaModel");
const { Captcha } = require('../../Utils/captchaUtils')
const caScoreModel = require("../../database/models/caScoreModel")
const trackingCaModel = require('../../database/models/trackingCaModel')
const verifiedModel = require('../../database/models/verifiedModel')
const { dropTreasure } = require('../../Utils/dropTreasureUtils');
const { thanhTuuUtils } = require('../../Utils/thanhTuuUtils');

module.exports = {
  name: "cauca",
  aliases: ["fish", "cc"],
  description: "Câu cá kiếm nguyên liệu",
  cooldowns: 15,
  adminOnly: false,
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {*} args
   * @param {*} userData
   */
  run: async (client, message, args, userData) => {
    
    let verifyData = await verifiedModel.findOne({ userId: message.author.id })
    if (verifyData) return message.reply('**Vui lòng nhập captcha để tiếp tục sử dung bot**')
    await Captcha(client, message)
    await dropTreasure(client, message);
    let [data, timeData, caScore] = await Promise.all([
      buffCauCaModel.findOne({ userId: message.author.id }),
      timeModelTest.findOne(),
      caScoreModel.findOne({ userId: message.author.id }),
    ]);

    if (!caScore) {
      caScore = new caScoreModel({
        userId: message.author.id,
        score: 0
      })
    }

    await client.addThongKe(message.author.id, "cauca");
    //await thanhTuuUtils(client, message, "cauca");

    let rarity = {
      "Very Common": 35,
      "Common": 10,
      "Uncommon": 10,
      "Rare": 5,
      "Very Rare": 1,
      "Legendary": 0
    };

    let buffMsg = ``;

    if (!data) {
      rarity = {
        "Very Common": 35,
        "Common": 10,
        "Uncommon": 10,
        "Rare": 5,
        "Very Rare": 1,
        "Legendary": 0
      };
      buffMsg += `Bạn đang bắt cá bằng **hai tay**`;
    } else {
      let soLuongBuff = data.soLuongBuff;
      let type = data.type;

      if (data.soLuongBuff === 0) {
        await data.deleteOne()
      }

      if (soLuongBuff >= 1 && type == 1) {
        rarity = {
          "Very Common": 40, //85 % cá
          "Common": 25, // 15% rác
          "Uncommon": 10,
          "Rare": 7,
          "Very Rare": 3,
          "Legendary": 0
        };
        client.truBuffCauCa(message.author.id, 1, 1);
        buffMsg += `Bạn đang bắt cá bằng **cần câu tre** <:Flimsy_Fishing_Rod_NH_Icon:1140523577821626438> \`(${
          soLuongBuff - 1
        }/10)\``;
      } else if (soLuongBuff >= 1 && type == 2) {
        rarity = {
          "Very Common": 30, // 90% cá
          "Common": 30,
          "Uncommon": 15,
          "Rare": 10,
          "Very Rare": 5,
          "Legendary": 0
        };
        client.truBuffCauCa(message.author.id, 1, 2);
        buffMsg += `Bạn đang bắt cá bằng **cần câu xịn** <:pro_fishing_rod49:1140523548763500665> \`(${
          soLuongBuff - 1
        }/20)\``;
      } else if (soLuongBuff >= 1 && type == 3) {
        rarity = {
          "Very Common": 25, // 90% cá
          "Common": 30,
          "Uncommon": 15,
          "Rare": 13,
          "Very Rare": 7,
          "Legendary": 0
        };
        client.truBuffCauCa(message.author.id, 1, 3);
        buffMsg += `Bạn đang bắt cá bằng **lưới** <:Flimsy_Net_NH_Icon:1140523599170654298> \`(${soLuongBuff - 1}/50)\``;
      } else if (soLuongBuff >= 1 && type == 4) {
        rarity = {
          "Very Common": 20, 
          "Common": 24,
          "Uncommon": 30,
          "Rare": 25,
          "Very Rare": 10,
          "Legendary": 1
        };
        client.truBuffCauCa(message.author.id, 1, 4);
        buffMsg += `Bạn đang bắt cá bằng **lưới vip** <:Golden_Net_NH_Inv_Icon:1140523506656874496> \`(${
          soLuongBuff - 1
        }/100)\``;
      }
    }

    const veryCommonFish = fishData.fish.filter(
      (fish) => fish.rarity === "Very Common"
    );

    const commonFish = fishData.fish.filter(
      (fish) => fish.rarity === "Common"
    );

    const unCommonFish = fishData.fish.filter(
      (fish) => fish.rarity === "Uncommon"
    );

    const rareFish = fishData.fish.filter(
      (fish) => fish.rarity === "Rare"
    );

    const veryRareFish = fishData.fish.filter(
      (fish) => fish.rarity === "Very Rare"
    );

    const legendFish = fishData.fish.filter(
      (fish) => fish.rarity === "Legendary"
    )
     
    function getRandomRarity() {
      const randomNum = Math.random() * 100;
      let cumulativeProbability = 0;
      for (const [rarityName, probability] of Object.entries(rarity)) {
        //Object.entries(rarity): Lấy danh sách các cặp key-value trong đối tượng rarity
        cumulativeProbability += probability;
        if (randomNum <= cumulativeProbability) {

          return rarityName;
        }
      }
    }

    function getRandomFish(rarityArray) {
      var fishArray = [];
      if (rarityArray) {
        for (const fish of rarityArray) { 
          if (
            fish.time.includes(timeData.hour) &&
            fish.months.includes(timeData.month)
          ) fishArray.push(fish);
        }

        const randomIndex = Math.floor(Math.random() * fishArray.length); 
        return fishArray[randomIndex];
      } else {
        return fishData.fail;
      }
    }

    const randomRarity = getRandomRarity();
    let result;

    switch (randomRarity) {
      case "Very Common":
        result = getRandomFish(veryCommonFish);
        await client.addCa(message.author.id, "Very Common", 1);
        break;
      case "Common":
        result = getRandomFish(commonFish);
        await client.addCa(message.author.id, "Common", 1);
        break;
      case "Uncommon":
        result = getRandomFish(unCommonFish);
        await client.addCa(message.author.id, "Uncommon", 1);
        break;
      case "Rare":
        result = getRandomFish(rareFish);
        await client.addCa(message.author.id, "Rare", 1);
        break;
      case "Very Rare":
        result = getRandomFish(veryRareFish);
        await client.addCa(message.author.id, "Very Rare", 1);
        await client.addThongKe(message.author.id, "VeryRare");
        break;
      case "Legendary":
        result = getRandomFish(legendFish);
        await client.addCa(message.author.id, "Legendary", 1);
        await client.addThongKe(message.author.id, "legendary");
        break;
    }
    
    const channelId = "1129314158555443231";

    if (result) {
      if (message.channel.id === channelId) {
        if (result.rarity === "Very Common") caScore.score += 20
        if (result.rarity === "Common") caScore.score += 30
        if (result.rarity === "Uncommon") caScore.score += 40
        if (result.rarity === "Rare") caScore.score += 50
        if (result.rarity === "Very Rare") caScore.score += 70
        if (result.rarity === "Legendary") caScore.score += 200
        await caScore.save()
      }

      const fishEmbed = new Discord.EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Bạn đã bắt được \`${result.name}\``)
        .setDescription(
          `Độ hiếm: **${result.rarity}** ${result.rarity === 'Very Common' ? ':black_circle:' : result.rarity === 'Common' ? ':white_circle:' : result.rarity === "Uncommon" ? ':green_circle:' : result.rarity === "Rare" ? ':blue_circle:' : result.rarity === "Legendary" ? ':yellow_circle:' : ':purple_circle:'}
          \n \
          Kích thước: **${result.size[Math.floor(Math.random() * result.size.length)]} cm** 
          \n \
`
        )
        .setFooter({ text: `${result.catch}` })
        .setThumbnail(`${result.image}`);
        await client.addTien(message.author.id, result.price)
      message.reply({ embeds: [fishEmbed], content: `${message.channel.id === channelId ? `${buffMsg} - ${caScore.score} điểm <a:Minecraft_Fish7:1141240605800939650>` : `${buffMsg}`}` });
    } else {
      const fail = fishData.fail;
      const failEmbed = new Discord.EmbedBuilder()
        .setTitle(`${fail[Math.floor(Math.random() * fail.length)]}`)
        .setTimestamp();  
      message.reply({ embeds: [failEmbed], content: `${message.channel.id === channelId ? `${buffMsg} - ${caScore.score} điểm <a:Minecraft_Fish7:1141240605800939650>` : `${buffMsg}`}`  });
    } 

    let dataCa = await trackingCaModel.findOne({
      userId: message.author.id
    })

    if (!dataCa) {
      dataCa = new trackingCaModel({
          userId: message.author.id,
      })
    }
    await dataCa.save()
    
    if (dataCa.enable == true) {
      setTimeout(() => {
        message.reply(`${dataCa.text.length === 0 ? `\`nqg cauca\` đã sẵn sàng!` : dataCa.text}`)
      }, 15000);
    }
  },
};
