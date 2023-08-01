const Discord = require("discord.js");

module.exports = {
  name: "daily",
  aliases: ["daily"],
  description: "Nhận tiền hàng ngày của bạn",
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {*} args
   */
  run: async (client, message, args, userData) => {
    if (!userData) return message.reply('Hình như chúng tôi chưa cấu hình tài khoản cho bạn. Hãy dùng lệnh `!start`!')
    const username = message.author.username;
    const dailyReward = 100;
    const currentTime = new Date();
    const lastDaily = userData.daily.timestamp;

    const remainingTime = lastDaily
      ? 24 * 60 * 60 * 1000 - (currentTime - lastDaily) : 0;

    if (remainingTime > 0) {
      // Chuyển đổi thời gian từ millisecond sang giờ, phút và giây
      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
      const remainingMinutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      message.channel.send(
        `Bạn đã nhận tiền hàng ngày rồi, hãy quay lại sau ${remainingHours} giờ, ${remainingMinutes} phút và ${remainingSeconds} giây.`
      );
      return;
    }

    const resetStreak = new Date(currentTime - 24 * 60 * 60 * 1000)
    if (lastDaily < resetStreak) {
        userData.daily.streak = 0
    }
    
    client.addTien(message.author.id, 100)
    userData.daily.streak += 1;
    userData.daily.timestamp = currentTime;
    await userData.save();

    //await db.findOneAndUpdate({ userId: message.author.id }, { $inc: { balance: dailyReward } });
    message.channel.send(
      `**${username}** đã nhận được ${dailyReward} coins, **streak** \`${userData.daily.streak}\``
    );
  },
};
