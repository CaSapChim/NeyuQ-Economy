const timeData = require("../../data/time.json");
const { EmbedBuilder } = require("discord.js");
const fishData = require("../../data/fish.json");

module.exports = {
  name: "time",
  description: "Xem thời gian ảo của server",

  run: async (client, message, args, userData) => {
    const toDate = function (date) {
      return `${date.hour}${date.hour > 12 ? "pm" : "am"} ngày ${date.day} tháng ${
        date.month
      } năm ${date.year}`;
    };
    const fishAvailableArray = fishData.fish.filter(
      (fish) =>
        fish.time.includes(timeData.hour) &&
        fish.months.includes(timeData.month)
    ).sort((a, b) => a.rarity.localeCompare(b.rarity));

    let fishAvailableName = [];
    let fishAvailableRarity = [];
    let fishAvailablePrice = []
    fishAvailableArray.forEach((fish) => fishAvailableName.push(fish.name));
    fishAvailableArray.forEach((fish) => fishAvailableRarity.push(fish.rarity));
    fishAvailableArray.forEach((fish) => fishAvailablePrice.push(fish.price));

    const fishList = fishAvailableName.map((fishName, i) => `${fishAvailableRarity[i] === 'Very Common' ? ':black_circle:' : fishAvailableRarity[i] === 'Common' ? ':white_circle:' : fishAvailableRarity[i] === "Uncommon" ? ':green_circle:' : fishAvailableRarity[i] === "Rare" ? ':blue_circle:' : ':purple_circle:'}  ${fishAvailableRarity[i]} | ${fishName} - ${fishAvailablePrice[i]} <:O_o:1135831601205481523> coins`).join("\n\n");
    const dateEmbed = new EmbedBuilder()
      .setColor("Gold")
      .setAuthor({
        name: `⏰ THÔNG BÁO THỜI GIAN ⏰`
      })
      .setTitle(`Thời gian hôm nay : ${toDate(timeData)}`)
      .setDescription(
        `Các loài cá có thể câu được hôm nay:

        ${fishList}

      `)
      .setFooter({ text: "Đây là thời gian ảo của bot"});

    await message.channel.send({ embeds: [dateEmbed] });
  },
};
