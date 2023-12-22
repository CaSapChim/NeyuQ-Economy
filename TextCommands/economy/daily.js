const Discord = require("discord.js");
const marryModel = require('../../database/models/marryModel');

module.exports = {
  name: "daily",
  aliases: ["daily"],
  description: "Nhận tiền hàng ngày của bạn",
  adminOnly: false,
  /**
   * 
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {*} args 
   * @param {*} userData 
   * @returns 
   */
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

    let dailyReward = 500;

    if (streak === 2) {
      dailyReward = 1000;
    } else if (streak === 3) {
      dailyReward = 2000;
    } else if (streak === 4) {
      dailyReward = 4000;
    } else if (streak >= 5) {
      dailyReward = 8000;
    }

    const bonusRoles = [
      { roleId: '1071392984639229984', bonus: 2500 }, // booster
      { roleId: '1113451254195159161', bonus: 1000 }, //  donator 1
      { roleId: '1135968082435788952', bonus: 2000 }, // donator 2
      { roleId: '1076113410355363860', bonus: 1000 }, // MC
      { roleId: '1127613575314284614', bonus: 3000 }, // girlgang
      { roleId: '1113451367181332530', bonus: 3000}, // donator 3
      { roleId: '1175546375530885190', bonus: 4000}, // donator 4
      { roleId: '1176075681667498044', bonus: 5000}, // donator 5
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
    let msg = ``;

    let marryData = await marryModel.findOne({ $or: [{userId1: message.author.id}, {userId2: message.author.id }] });
    if (marryData) {
      // Nếu userId1 == id của người dùng lệnh thì + tiền cho người đã kết hôn vs mình (userId2)
      if (marryData.userId1 === message.author.id) {
        client.addTien(marryData.userId2, totalReward/2);
        msg += `, Người yêu bạn được nhận thêm ${totalReward/2} vì đã cưới bạn`;
      } else {
        client.addTien(marryData.userId1, totalReward/2);
        msg += `, Người yêu bạn được nhận thêm ${totalReward/2} vì đã cưới bạn`;
      }
    }

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

    message.channel.send({ content: `<@${message.author.id}>${msg}`, embeds: [dailyEmbed] });
  },
};