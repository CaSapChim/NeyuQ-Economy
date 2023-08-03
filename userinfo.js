const Discord = require("discord.js");
const moment = require("moment");

function getBadges(badges) {
  const badgeEmoji = {
    DISCORD_EMPLOYEE: "<:1247discordbravery:1129673754751029298>",
    PARTNERED_SERVER_OWNER: "<:1350discordbrillance:1129673758093889596>",
    HYPESQUAD_EVENTS: "<:5946discordbalance:1129673768759984159>",
    BUGHUNTER_LEVEL_1: "<:5651pomelo:1129673767015166034>",
    HOUSE_BRAVERY: "<:1247discordbravery:1129673754751029298>",
    HOUSE_BRILLIANCE: "<:1350discordbrillance:1129673758093889596>",
    HOUSE_BALANCE: "<:5946discordbalance:1129673768759984159>",
    EARLY_SUPPORTER: "<:4779nitroinsettings:1129673763550674975>",
    TEAM_USER: "Team User",
    SYSTEM: "System",
    BUGHUNTER_LEVEL_2: "<:B_4_activedev:1131130131885330432>",
    VERIFIED_BOT: "Verified Bot",
    EARLY_VERIFIED_BOT_DEVELOPER:
      "<:B_4_activedev:1131130131885330432>",
  };

  return badges.map((badge) => badgeEmoji[badge]).join(" ");
}

module.exports = {
  name: "userinfo",
  aliases: ["info", "ui"],
  description: "Xem thông tin chính mình hoặc người dùng khác",
  /**
   *
   * @param {*} client
   * @param {Discord.Message} message
   * @param {*} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.member;
    const nick = user.nickname || "Không có";

    let userBot;
    if (user.bot) {
      userBot = "Đây là bot";
    } else {
      userBot = "Không phải bot";
    }

    // Sắp xếp role từ cao nhất xuống thấp nhất
    let rolesArray = user.roles.cache.map((role) => role);
    rolesArray.sort((a, b) => b.position - a.position);

    let rolesString =
      rolesArray.length > 20
        ? rolesArray
            .slice(0, 20)
            .map((role) => `<@&${role.id}>`)
            .join(", ") + ", ..."
        : rolesArray.map((role) => `<@&${role.id}>`).join(", ");

    if (rolesArray.lenght === 0) {
      rolesString = "Không có role";
    }
    const flags = await user.user.fetchFlags();
    const badges = flags.toArray();
    
    // Hiển thị các badge của người dùng
    let badgesString = getBadges(badges);
    if (badges.length === 0) {
      badgesString = "Không có badge";
    }

    const userinfoEmbed = new Discord.EmbedBuilder()
    .setColor("Aqua")
    .setTitle(`Thông tin của ${user.displayName}`)
    .setThumbnail(
      user.displayAvatarURL({
        dynamic: true,
      })
    )
    .addFields([
      {
        name: `Thông tin chung:`,
        value: `Tên: \`${user.user.username}\` \nID:  \`${user.id}\`\nNickname: \`${nick}\``,
      },
      {
        name: `Tổng quan:`,
        value: `\nBot: \`${userBot}\`\nBadge: \`${badgesString}\``,
      },
      {
        name: `Thông tin liên quan đến máy chủ:`,
        value: `Roles: ${rolesString}`,
      },
      {
        name: `Thông tin khác:`,
        value: `Tài khoản được tạo vào: \n\`${moment(
          user.user.createdAt
        ).format(
          "dddd, MMMM Do YYYY, h:mm:ss A"
        )}\` \nTham gia vào server vào: \n\`${moment(user.joinedAt).format(
          "dddd, MMMM Do YYYY, h:mm:ss A"
        )}\``,
      },
    ])
    .setTimestamp();
  await message.reply({ embeds: [userinfoEmbed] });  
  },
};
