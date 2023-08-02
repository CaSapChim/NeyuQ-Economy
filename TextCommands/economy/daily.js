const Discord = require("discord.js");

module.exports = {
  name: "daily",
  aliases: ["daily"],
  description: "Nhận tiền hàng ngày của bạn",
  run: async (client, message, args, userData) => {
    if (!userData) {
      return message.reply('Hình như chúng tôi chưa cấu hình tài khoản cho bạn. Hãy dùng lệnh `!start`!');
    }

     const currentTime = new Date();
     const lastDaily = userData.daily.timestamp;
     const elapsedMillis = currentTime - lastDaily;
     const elapsedDays = Math.floor(elapsedMillis / (24 * 60 * 60 * 1000));

    // if (elapsedDays === 0) {
    //   // Tính thời gian còn lại cho người dùng có thể nhận tiền hàng ngày tiếp theo
    //   const remainingMillis = 24 * 60 * 60 * 1000 - elapsedMillis;
    //   const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
    //   const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
    //   const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);

    //   return message.channel.send(`Bạn đã nhận tiền hàng ngày rồi. Hãy quay lại sau ${remainingHours} giờ, ${remainingMinutes} phút và ${remainingSeconds} giây.`);
    // }

    const streak = elapsedDays > 1 ? 0 : userData.daily.streak + 1;
    userData.daily.streak = streak;
    userData.daily.timestamp = currentTime;

    let dailyReward = 100;

    if (streak === 2) {
      dailyReward = 200;
    } else if (streak === 3) {
      dailyReward = 300;
    } else if (streak === 4) {
      dailyReward = 400;
    } else if (streak >= 5) {
      dailyReward = 500;
    }

    const bonusRoles = [
      { roleId: '1083780659128053791', bonus: 150 },
      { roleId: '1118211005521076254', bonus: 50 },
      { roleId: '1136198796733337630', bonus: 100 }
    ];

    let bonusMoney = 0;
    let userRoleName = 'Không có';

    const userRoles = message.member.roles.cache;
    for (const bonusRole of bonusRoles) {
      if (userRoles.has(bonusRole.roleId)) {
        bonusMoney += bonusRole.bonus;
        if (userRoleName === 'Không có') {
          userRoleName = '';
        } else {
          userRoleName += ', ';
        }
        userRoleName += `<@&${bonusRole.roleId}>`;
      }
    }

    const totalReward = dailyReward + bonusMoney;
    client.addTien(message.author.id, totalReward);

    try {
      await userData.save();
    } catch (err) {
      console.log('Lỗi daily:', err);
    }

    const dailyEmbed = new Discord.EmbedBuilder()
      .setTitle(`${message.author.username}`)
      .setDescription(`
        <a:verified_tick:1130871737580531792> Nhận Thành Công\n
        <:tiu:1135830334664085554> Quà Hàng Ngày: ${dailyReward} coins\n
        <:chamxanh:1124058113742479400> Bạn đã điểm danh được: ${streak} ngày\n
        <:chamxanh:1124058113742479400> ${userRoleName}: + ${bonusMoney} coins\n
        <:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276>
        <:chamxanh:1124058113742479400> Tổng nhận được: ${totalReward} coins
      `)
      .setThumbnail('https://cdn.discordapp.com/attachments/1080521432032882700/1136198965029773363/daily.png')
      .setTimestamp()
      .setColor('#61c4ff');

    message.channel.send({ embeds: [dailyEmbed] });
  },
};