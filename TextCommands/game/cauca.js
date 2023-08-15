const Discord = require("discord.js");
const fishData = require("../../data/fish.json");
const ownerId = require("../../config.json").OWNER_ID;
const timeData = require("../../data/time.json");
const buffCauCaModel = require("../../database/models/buffCauCaModel");

module.exports = {
  name: "cauca",
  aliases: ["fish", "cc"],
  description: "Lệnh cho phép member câu cá trong server",
  cooldown: 60,
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {*} args
   * @param {*} userData
   */
  run: async (client, message, args, userData) => {

    let data = await buffCauCaModel.findOne({
      userId: message.author.id,
    });

    let rarity = {
      "Very Common": 35,
      "Common": 10,
      "Uncommon": 10,
      "Rare": 4,
      "Very Rare": 1,
    };

    let buffMsg = ``;

    if (!data) {
      rarity = {
        "Very Common": 35,
        "Common": 10,
        "Uncommon": 10,
        "Rare": 4,
        "Very Rare": 1,
      };
      buffMsg += `Bạn đang bắt cá bằng **hai tay**`;
    } else {
      let soLuongBuff = data.soLuongBuff;
      let type = data.type;

      if (soLuongBuff > 0 && type == 1) {
        rarity = {
          "Very Common": 40, //85 % cá
          "Common": 25, // 15% rác
          "Uncommon": 10,
          "Rare": 7,
          "Very Rare": 3,
        };
        client.truBuffCauCa(message.author.id, 1, 1);
        buffMsg += `Bạn đang bắt cá bằng **cần câu tre** <:Flimsy_Fishing_Rod_NH_Icon:1140523577821626438> \`(${
          soLuongBuff - 1
        }/10)\``;
      } else if (soLuongBuff > 0 && type == 2) {
        rarity = {
          "Very Common": 30, // 90% cá
          "Common": 30,
          "Uncommon": 15,
          "Rare": 10,
          "Very Rare": 5,
        };
        client.truBuffCauCa(message.author.id, 1, 2);
        buffMsg += `Bạn đang bắt cá bằng **cần câu xịn** <:pro_fishing_rod49:1140523548763500665> \`(${
          soLuongBuff - 1
        }/20)\``;
      } else if (soLuongBuff > 0 && type == 3) {
        rarity = {
          "Very Common": 25, // 90% cá
          "Common": 30,
          "Uncommon": 15,
          "Rare": 13,
          "Very Rare": 7,
        };
        client.truBuffCauCa(message.author.id, 1, 3);
        buffMsg += `Bạn đang bắt cá bằng **lưới** <:Flimsy_Net_NH_Icon:1140523599170654298> \`(${soLuongBuff - 1}/50)\``;
      } else if (soLuongBuff > 0 && type == 4) {
        rarity = {
          "Very Common": 25, // 95% cá
          "Common": 25,
          "Uncommon": 20,
          "Rare": 20,
          "Very Rare": 15,
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
    const commonFish = fishData.fish.filter((fish) => fish.rarity === "Common");
    const unCommonFish = fishData.fish.filter(
      (fish) => fish.rarity === "Uncommon"
    );
    const rareFish = fishData.fish.filter((fish) => fish.rarity === "Rare");
    const veryRareFish = fishData.fish.filter(
      (fish) => fish.rarity === "Very Rare"
    );

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
        break;
      case "Common":
        result = getRandomFish(commonFish);
        break;
      case "Uncommon":
        result = getRandomFish(unCommonFish);
        break;
      case "Rare":
        result = getRandomFish(rareFish);
        break;
      case "Very Rare":
        result = getRandomFish(veryRareFish);
        break;
    }

    if (result) {
      const fishEmbed = new Discord.EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Bạn đã bắt được \`${result.name}\``)
        .setDescription(
          `Độ hiếm: **${result.rarity}** ${result.rarity === 'Very Common' ? ':black_circle:' : result.rarity === 'Common' ? ':white_circle:' : result.rarity === "Uncommon" ? ':green_circle:' : result.rarity === "Rare" ? ':blue_circle:' : ':purple_circle:'}
          \n \
          Kích thước: **${result.size[Math.floor(Math.random() * result.size.length)]} cm** 
          \n \
          Giá: **${result.price}**  <:O_o:1135831601205481523> coins`
        )
        .setFooter({ text: `${result.catch}` })
        .setThumbnail(`${result.image}`);
        await client.addTien(message.author.id, result.price)
      message.reply({ embeds: [fishEmbed], content: `${buffMsg}` });
    } else {
      const fail = fishData.fail;
      const failEmbed = new Discord.EmbedBuilder()
        .setTitle(`${fail[Math.floor(Math.random() * fail.length)]}`)
        .setTimestamp();  
      message.reply({ embeds: [failEmbed], content: `${buffMsg}` });
    }
  },
};
