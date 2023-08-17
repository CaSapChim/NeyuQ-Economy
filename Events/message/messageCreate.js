const {
  Collection,
  Client,
  Message,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const userModel = require("../../database/models/userModel.js");
const prefixModel = require("../../database/models/prefixModel");
const banModel = require("../../database/models/banModel.js");
const { dropGift } = require('../../Utils/dropGiftUtil.js')
const ownerId = require('../../config.json').OWNER_ID

module.exports = {
  name: "messageCreate",
  once: false,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  async execute(client, message) {
    if (message.author.bot) return;

    // Ban
    let ban = await banModel.findOne({ userId: message.author.id });
    if (ban) {
      if (ban.userId == message.author.id) return;
    }

    let prefix = '!'


    if (message.channelId == '1070274984750100522') {
      const recieveGift = await dropGift(message.author.id)
      if (recieveGift) {
        return message.reply('**Đang chat thì tự nhiên lụm được <:t_:1138458437559263323>.\nCheck `nqg mayman` ngay!**')
      }
    }

    const content = message.content.toLowerCase();
    if (!content.startsWith(prefix)) return;
    const args = content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift();
    const command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;

    if (!message.guild) return

    let arr = ['cash', 'bal', 'money', 'ping', 'p']
    let allowed = false

    arr.forEach(i => {
      if (i === cmd) allowed = true
    })
    if (message.channel.id === '1070274984750100522' && (!allowed && !ownerId.includes(message.author.id))) return

    // Lấy thông tin người dùng và chuyển đến lệnh
    let userData;
    try {
      userData = await userModel.findOne({ userId: message.author.id });

      if (!userData) {
        const tosEmbed = new EmbedBuilder()
          .setColor("Green")
          .setTitle("**ĐIỀU KHOẢN SỬ DỤNG - BOT GAME VÀ HỆ THỐNG KINH TẾ**")
          .setDescription(`
                  Vui lòng đọc kỹ và hiểu rõ các điều khoản sau trước khi sử dụng bot của chúng tôi. Bằng cách sử dụng bot, bạn đồng ý tuân thủ tất cả các điều khoản dưới đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng bot.
    
                  **1. Gian lận và phần mềm thứ 3**
    
                  1.1. Chúng tôi không chấp nhận người dùng sử dụng phần mềm thứ 3 dưới mọi hình thức.
    
                  1.2. Phát hiện và lợi dụng bug của bot cho mục đích cá nhân sẽ bị BAN thẳng tay. 
                  
                  **2. Sự thay đổi và cập nhật**
                  
                  2.1. Chúng tôi có quyền thay đổi hoặc cập nhật các tính năng mới cho bot mà không cần báo trước.
                  
                  2.2. Do đó hãy theo dõi kênh <#1071425301902544957> thường xuyên để biết thêm những cập nhật mới về bot.
                  
                  Bằng cách sử dụng bot, bạn xác nhận đã đọc, hiểu và chấp nhận tất cả các điều khoản sử dụng. Nếu bạn không đồng ý với các điều khoản này, vui lòng không sử dụng bot.
                  
                  **Liên hệ:**
                  
                  Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào về các điều khoản sử dụng này, vui lòng liên hệ với chúng tôi qua [del biết ghi gì].
                `);

        const tosBtn = new ButtonBuilder()
          .setCustomId("accept")
          .setLabel("Chấp nhận điều khoản")
          .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(tosBtn);

        const a = await message.channel.send({
          embeds: [tosEmbed],
          components: [row],
        });

        var collector = a.createMessageComponentCollector({
          filter: (interaction) =>
            (interaction.isButton() || interaction.isSelectMenu()) &&
            interaction.message.author.id == client.user.id,
          time: 5 * 60000,
        });

        collector.on("collect", async (interaction) => {
          if (interaction.user.id !== message.author.id)
            return interaction.reply({
              content: "Này, nút này không phải dành cho bạn!",
              ephemeral: true,
            });
          if (interaction.customId === "accept") {
            interaction.deferUpdate();

            userData = new userModel({
              username: message.author.username,
              userId: message.author.id,
              inventory: [],
            });

            const embed = new EmbedBuilder()
              .setColor('Random')
              .setDescription(`Cảm ơn bạn <@${message.author.id}> đã đồng ý TOS, tặng bạn **100 <:O_o:1135831601205481523> coins**`)

            a.edit({ embeds: [embed], components: [] });
            await userData.save();
  
            await client.addTien(message.author.id, 100);
          }
        });

        collector.on("end", async () => {
          await a.delete();
        });
        return;
      }
    } catch (err) {
      console.log("Lỗi userModel", err);
    }

    ///////////////////////////////////////////////// Cooldown
    // cooldowns
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeftInSeconds = Math.floor((expirationTime - now) / 1000);
        const hours = Math.floor(timeLeftInSeconds / 3600);
        const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);
        const seconds = timeLeftInSeconds % 60;
    
        let timeLeftString = "";
        if (hours > 0) {
          timeLeftString += `${hours} giờ `;
        }
        if (minutes > 0) {
          timeLeftString += `${minutes} phút `;
        }
        if (seconds > 0) {
          timeLeftString += `${seconds} giây `;
        }
    
        return message.reply(`Vui lòng chờ ${timeLeftString}để dùng lại lệnh \`${command.name}\``)
          .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });;
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //////////////////////////////////////////////////
    try {
      await command.run(client, message, args, userData);
    } catch (e) {
      console.error("Lỗi: ", e);
    }
  },
};
