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
  
    userData.daily.streak += 1;
    userData.daily.timestamp = currentTime;

    let userRole = message.member.roles.cache

    const boosterRoleId = '1083780659128053791'
    const donator1RoleId = '1118211005521076254'
    const donator2RoleId = '1136198796733337630'

    const booster = userRole.get(boosterRoleId)
    const donator1 = userRole.get(donator1RoleId)
    const donator2 = userRole.get(donator2RoleId)
    
    let userRoleName = 'Không có'
    const dailyReward = 100;
    let bonusMoney = 0

    if (booster && donator1 && donator2 ) {
      bonusMoney = 600;
      userRoleName = '<@&1083780659128053791>, <@&1118211005521076254>, <@&1136198796733337630>';
    } else if ( booster && donator1) {
      bonusMoney = 400
      userRoleName = '<@&1083780659128053791>, <@&1118211005521076254>'
    } else if ( booster && donator2) {
      bonusMoney = 500
      userRoleName = '<@&1083780659128053791>, <@&1136198796733337630>';
    } else if ( donator1 && donator2 ) {
      bonusMoney = 300
      userRoleName = '<@&1118211005521076254>, <@&1136198796733337630>';
    } else if (booster) {
      bonusMoney = 300;
      userRoleName = '<@&1083780659128053791>';
    } else if (donator1) {
      bonusMoney = 100;
      userRoleName = '<@&1118211005521076254>';
    } else if (donator2) {
      bonusMoney = 200;
      userRoleName = '<@&1136198796733337630>';
    }

    client.addTien(message.author.id, dailyReward + bonusMoney);
    
    try {
      await userData.save()
    } catch (err) {
      console.log('Lỗi daily:', err)
    }

    userData.save()
    const dailyEmbed = new Discord.EmbedBuilder()
    .setTitle(`${message.author.username}`)
    .setDescription(`<a:verified_tick:1130871737580531792> Nhận Thành Công
    
    <:tiu:1135830334664085554> Quà Hàng Ngày: 
    
    <:chamxanh:1124058113742479400> Nhận quà hàng ngày: ${dailyReward} coins\n
    <:chamxanh:1124058113742479400> Bạn đã điểm danh được: ${userData.daily.streak} ngày\n
    <:chamxanh:1124058113742479400> ${userRoleName}: + ${bonusMoney} coins\n
    <:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276><:gach:1136207746384011276>
    <:chamxanh:1124058113742479400> Tổng nhận được: ${dailyReward + bonusMoney}
    
    `)
    .setThumbnail('https://cdn.discordapp.com/attachments/1080521432032882700/1136198965029773363/daily.png')
    .setTimestamp()
    message.channel.send({ embeds: [dailyEmbed]})
  },
};
