const {
  Client,
  Activity,
  ActivityType,
  EmbedBuilder,
  Message,
} = require("discord.js");
const { initializeMongoose } = require("../../database/mongoose");
const timeModel = require("../../database/models/timeModel");
const fishData = require("../../data/fish.json");
const cron = require('node-cron');
const emoji = require('../../emoji.json');
const caScoreModel = require('../../database/models/caScoreModel');

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

    cron.schedule('30 19 * * 1,3,5', () => { // thứ 2 4 6
      const channelId = '1080521432032882700';
      const channel = client.channels.cache.get(channelId);
  
      if (channel) {
        channel.send(`${emoji.congra} ${emoji.congra} **EVENT CÂU CÁ BẮT ĐẦU (7H30 - 8H00)** ${emoji.congra} ${emoji.congra}\nVào kênh <#1070274984750100522> để tham gia event nhaaa.`).then(() => {
          setTimeout(async () => {
            channel.send(`**ĐÃ KẾT THÚC EVENT CÂU CÁ**`);
            let diemCauCa = await caScoreModel.find().sort({ score: -1 });
            let leaderboard = diemCauCa
                .slice(0, 10)
                .map((user, index) => {
                    const positionEmoji = getMedalEmoji(index);
                    return `${positionEmoji} ${client.users.cache.get(user.userId)} - ${user.score} điểm <a:Minecraft_Fish7:1141240605800939650>`;
                })
                .join('\n');

            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTitle(`TOP 10 ĐIỂM CÂU CÁ`)
                .setDescription(leaderboard)
                .setFooter({ text: 'Câu càng nhiều, điểm càng cao!'})
                .setTimestamp();

            channel.send({ embeds: [embed] });
            await caScoreModel.deleteMany({});
          }, 1 * 60 * 1000);
        })
      } else {
        console.error('Không tìm thấy kênh');
      }
    });

    function getMedalEmoji(index) {
      switch (index) {
          case 0:
              return '<:NQGTop1:1138175075829428387>';
          case 1:
              return '<:NQGTop2:1138175115130060843>';
          case 2:
              return '<:NQGTop3:1138175169324658849>';
          default:
              return `${index + 1}.`;
      }
  }

///////////////////////////////////////////////////////////////// time câu cá
    // sendTime();
    // setInterval(() => {
    //   sendTime();
    // }, 600000);
    // async function sendTime() {
    //   const channel = client.channels.cache.get("1129314158555443231");
    //   if (channel) {
    //     let data = await timeModel.findOne({});
    //     if (!data) {
    //       data = new timeModel({
    //         hour: 0,
    //         day: 1,
    //         month: 1,
    //         year: 0,
    //       });
    //     }
    //     data.hour = data.hour + 1
    //     if (data.hour === 24) {
    //       data.day++;
    //       data.hour = 0;
    //     }
    //     if (data.day === 31) {
    //       data.day = 1;
    //       data.month++;
    //     }
    //     if (data.month === 12) {
    //       data.year++;
    //       data.month = 1;
    //     }
    //     await data.save()
    //     console.log(data.hour)
    //     const toDate = function (date) {
    //       return `${date.hour} ${date.hour > 12 ? "giờ chiều" : "giờ sáng"} ngày ${
    //         date.day
    //       } tháng ${date.month} năm ${date.year}`;
    //     };
    //     const fishAvailableArray = fishData.fish
    //       .filter(
    //         (fish) =>
    //           fish.time.includes(data.hour) && fish.months.includes(data.month)
    //       )
    //       .sort((a, b) => a.rarity.localeCompare(b.rarity));

    //     let fishAvailableName = [];
    //     let fishAvailableRarity = [];
    //     let fishAvailablePrice = [];
    //     fishAvailableArray.forEach((fish) => fishAvailableName.push(fish.name));
    //     fishAvailableArray.forEach((fish) =>
    //       fishAvailableRarity.push(fish.rarity)
    //     );
    //     fishAvailableArray.forEach((fish) =>
    //       fishAvailablePrice.push(fish.price)
    //     );

    //     const fishList = fishAvailableName
    //       .map(
    //         (fishName, i) =>
    //           `${
    //             fishAvailableRarity[i] === "Very Common"
    //               ? ":black_circle:"
    //               : fishAvailableRarity[i] === "Common"
    //               ? ":white_circle:"
    //               : fishAvailableRarity[i] === "Uncommon"
    //               ? ":green_circle:"
    //               : fishAvailableRarity[i] === "Rare"
    //               ? ":blue_circle:"
    //               : fishAvailableRarity[i] === "Legendary"
    //               ? ":yellow_circle:"
    //               : ":purple_circle:"
    //           }  ${fishAvailableRarity[i]} | ${fishName} - ${
    //             fishAvailablePrice[i]
    //           } <:O_o:1135831601205481523> coins`
    //       )
    //       .join("\n\n");
    //     const dateEmbed = new EmbedBuilder()
    //       .setColor("Gold")
    //       .setAuthor({
    //         name: `⏰ THÔNG BÁO THỜI GIAN ⏰`,
    //       })
    //       // .setTitle(`Thời gian hôm nay : ${data.hour} - ngày ${data.day} tháng ${data.month} năm ${data.year}`)
    //       .setTitle(`Thời gian hôm nay: ${toDate(data)}`)
    //       .setDescription(
    //         `Các loài cá có thể câu được hôm nay:
  
    //       ${fishList}
  
    //     `
    //       )
    //       .setFooter({ text: "Đây là thời gian ảo của bot" });
    //     channel.send({ embeds: [dateEmbed] });
    //     console.log("Đã 10 phút trôi qua");
    //   }
    // }
  }, 
}; 
