const Discord = require("discord.js");
const userModel = require('../../database/models/userModel')

module.exports = {
  name: "daily",
  aliases: ["daily"],
  description: "Nhận tiền hàng ngày của bạn",
  run: async (client, message, args, userData) => {
  
     const currentTime = new Date();
     const lastDaily = userData.daily.timestamp;
     const elapsedMillis = currentTime - lastDaily;
     const elapsedDays = Math.floor(elapsedMillis / (24 * 60 * 60 * 1000));

     if (elapsedDays === 0) {
       // Tính thời gian còn lại cho người dùng có thể nhận tiền hàng ngày tiếp theo
       const remainingMillis = 24 * 60 * 60 * 1000 - elapsedMillis;
       const remainingHours = Math.floor(remainingMillis / (1000 * 60 * 60));
       const remainingMinutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
       const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);

       return message.channel.send(`Bạn đã nhận tiền hàng ngày rồi. Hãy quay lại sau ${remainingHours} giờ, ${remainingMinutes} phút và ${remainingSeconds} giây.`);
     }

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
      { roleId: '1071392984639229984', bonus: 150 }, // booster
      { roleId: '1113451254195159161', bonus: 50 }, //  donator 1
      { roleId: '1135968082435788952', bonus: 100 }, // donator 2
      { roleId: '1076113410355363860', bonus: 50 }, // MC
      { roleId: '1127613575314284614', bonus: 50 } // girlgang
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

  const thumb = [
    'https://cdn.discordapp.com/attachments/1080521432032882700/1137062771066945546/daily4.png',
    'https://cdn.discordapp.com/attachments/1080521432032882700/1137062771280846932/daily6.png',
    'https://cdn.discordapp.com/attachments/1080521432032882700/1137062771880640574/daily7.png',
    'https://cdn.discordapp.com/attachments/1080521432032882700/1137062772191010946/daily8.png',
    'https://cdn.discordapp.com/attachments/1080521432032882700/1137062772623036517/daily9.png'
  ]

    const dailyEmbed = new Discord.EmbedBuilder()
      .setTitle(`${message.author.username}`)
      .setDescription(`
        <a:verified_tick:1130871737580531792> Nhận Thành Công\n
        <:tiu:1135830334664085554> Quà Hàng Ngày: ${dailyReward} <:O_o:1135831601205481523> coins\n
        <:chamxanh:1124058113742479400> Bạn đã điểm danh được: ${streak} ngày\n
        <:chamxanh:1124058113742479400> ${userRoleName}: + ${bonusMoney} <:O_o:1135831601205481523> coins\n
        <:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276>
        <:chamxanh:1124058113742479400> Tổng nhận được: ${totalReward} <:O_o:1135831601205481523> coins
      `)
      .setThumbnail(thumb[Math.floor(Math.random() * thumb.length)])
      .setTimestamp()
      .setColor('#61c4ff');

    message.channel.send({ embeds: [dailyEmbed] });
  },
};