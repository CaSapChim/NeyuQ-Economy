const {
  Client,
  Activity,
  ActivityType,
  EmbedBuilder,
  Message,
} = require("discord.js");
const { initializeMongoose } = require("../../database/mongoose");
const timeModelTest = require("../../database/models/test/timeModelTest");

const fishData = require("../../data/fish.json");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param { Message } message
   * @param {Client} client
   */
  async execute(client, message) {
    client.user.setActivity(`http://discord.gg/neyuq`, {
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/nocopyrightsounds",
    });
    await initializeMongoose();
    console.log(
      `✅ Đăng Nhập Thành Công Vào ${client.user.tag}`.bold.brightBlue
    );
    sendTime();
    setInterval(() => {
      sendTime();
    }, 600000);

    async function sendTime() {
      const channel = client.channels.cache.get("1129314158555443231");
      if (channel) {
        let data = await timeModelTest.findOne({});
        if (!data) {
          data = new timeModelTest({
            hour: 0,
            day: 1,
            month: 1,
            year: 0,
          });
        }
        data.hour = data.hour + 1
        if (data.hour === 23) {
          data.day++;
          data.hour = 0;
        }
        if (data.day === 31) {
          data.day = 1;
          data.month++;
        }
        if (data.month === 12) {
          data.year++;
          data.month = 1;
        }
        await data.save()
        console.log(data.hour)
        const toDate = function (date) {
          return `${date.hour} ${date.hour > 12 ? "giờ chiều" : "giờ sáng"} ngày ${
            date.day
          } tháng ${date.month} năm ${date.year}`;
        };
        const fishAvailableArray = fishData.fish
          .filter(
            (fish) =>
              fish.time.includes(data.hour) && fish.months.includes(data.month)
          )
          .sort((a, b) => a.rarity.localeCompare(b.rarity));

        let fishAvailableName = [];
        let fishAvailableRarity = [];
        let fishAvailablePrice = [];
        fishAvailableArray.forEach((fish) => fishAvailableName.push(fish.name));
        fishAvailableArray.forEach((fish) =>
          fishAvailableRarity.push(fish.rarity)
        );
        fishAvailableArray.forEach((fish) =>
          fishAvailablePrice.push(fish.price)
        );

        const fishList = fishAvailableName
          .map(
            (fishName, i) =>
              `${
                fishAvailableRarity[i] === "Very Common"
                  ? ":black_circle:"
                  : fishAvailableRarity[i] === "Common"
                  ? ":white_circle:"
                  : fishAvailableRarity[i] === "Uncommon"
                  ? ":green_circle:"
                  : fishAvailableRarity[i] === "Rare"
                  ? ":blue_circle:"
                  : fishAvailableRarity[i] === "Legendary"
                  ? ":yellow_circle:"
                  : ":purple_circle:"
              }  ${fishAvailableRarity[i]} | ${fishName} - ${
                fishAvailablePrice[i]
              } <:O_o:1135831601205481523> coins`
          )
          .join("\n\n");
        const dateEmbed = new EmbedBuilder()
          .setColor("Gold")
          .setAuthor({
            name: `⏰ THÔNG BÁO THỜI GIAN ⏰`,
          })
          // .setTitle(`Thời gian hôm nay : ${data.hour} - ngày ${data.day} tháng ${data.month} năm ${data.year}`)
          .setTitle(`Thời gian hôm nay: ${toDate(data)}`)
          .setDescription(
            `Các loài cá có thể câu được hôm nay:
  
          ${fishList}
  
        `
          )
          .setFooter({ text: "Đây là thời gian ảo của bot" });
        channel.send({ embeds: [dateEmbed] });
        console.log("Đã 10 phút trôi qua");
      }
    }
  },
};
