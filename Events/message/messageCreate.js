const {
  Collection,
  Client,
  Message,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const userModel = require("../../database/models/userDataJob/userModel.js");
const prefixModel = require("../../database/models/prefixModel");
const banModel = require("../../database/models/banModel.js");
const { dropGift } = require('../../Utils/dropGiftUtil.js')
const ownerId = require('../../config.json').OWNER_ID
const emoji = require('../../emoji.json');

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

    let prefix
    let data = await prefixModel.findOne({ guildId: message.guildId, botId: client.user.id })
    
    if (data) {
      prefix = data.prefix
    } else {
      prefix = '.'
    }

    // if (message.channelId == '1070274984750100522') {
    //   const recieveGift = await dropGift(message.author.id)
    //   if (recieveGift) {
    //     return message.reply('**Đang chat thì tự nhiên lụm được <:t_:1138458437559263323>.\nCheck `nqg mayman` ngay!**')
    //   }
    // }

    const content = message.content.toLowerCase();
    if (!content.startsWith(prefix)) return;
    const args = content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    //if (!client.dev.has(command.name)) 
      client.dev.set(command.name, new Collection()); // client.dev.set(ping, [ownerId]);
    const isDev = client.dev.get(command.name);
    if (isDev) {
      if (!ownerId.includes(message.author.id))
        return message.reply(`${emoji.fail} Lệnh chỉ dành cho owner và developer!`).then(msg => {
          setTimeout(() => {
            msg.delete();
          }, 3000);
        });
    } 

    if (!command) return;

    if (!message.guild) return

    // let allowedCommand = ['cash', 'bal', 'money', 'ping', 'p', 'hun', 'give', 'marry', 'totinh', 'rela', 'banbe', 'ketban', 'mayman', 'fa', 'gift']
    // let allowedChannelId = ['1105078320644755486', '1141248052200472586', '1117459580927086622', '1117459513923096597']

    // if (!allowedCommand.includes(cmd) && !ownerId.includes(message.author.id)) {
    //   if (!allowedChannelId.includes(message.channel.id)) {
    //     return
    //   }  
    // } 

    // Lấy thông tin người dùng và chuyển đến lệnh
    let userData;
    try {
      userData = await userModel.findOne({ userId: message.author.id });
      if (!userData) {
        const tosEmbed = new EmbedBuilder()
          .setColor("Red")
          .setTitle("**ĐIỀU KHOẢN SỬ DỤNG - BOT GAME VÀ HỆ THỐNG KINH TẾ**")
          .setDescription(`
          <a:NA_GeneralUpdates:1166628301817786408> Vui lòng đọc kỹ và hiểu rõ các điều khoản sau trước khi sử dụng bot của chúng tôi. Bằng cách sử dụng bot, bạn đồng ý tuân thủ tất cả các điều khoản dưới đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng bot.<a:NA_GeneralUpdates:1166628301817786408>
    
                  **1. Gian lận và phần mềm thứ 3: **
    
                  1.1. Chúng tôi không chấp nhận người dùng sử dụng phần mềm thứ 3 dưới mọi hình thức.
    
                  1.2. Phát hiện và lợi dụng bug của bot cho mục đích cá nhân sẽ bị BAN thẳng tay. 
                  
                  **2. Sự thay đổi và cập nhật: **

                  2.1 Hãy theo dõi kênh <#1118050184312664094> thường xuyên để biết thêm những cập nhật mới về bot.
                  
                  **Liên hệ:**
                  
                  <a:Glitch_warn:1166628298374266971> Nếu bạn có bất kỳ thắc mắc hoặc báo lỗi nào, vui lòng liên hệ <@874321270437728257> hoặc <@942356413546635264>.
                `);

        const tosBtn = new ButtonBuilder()
          .setCustomId("accept")
          .setLabel("Chấp nhận điều khoản")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("👍")

        const row = new ActionRowBuilder().addComponents(tosBtn);

        const a = await message.reply({
          content: "**## Bằng cách sử dụng bot, bạn xác nhận đã đọc, hiểu và chấp nhận tất cả các điều khoản sử dụng. Nếu bạn không đồng ý với các điều khoản này, vui lòng không sử dụng bot.**",
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
              .setColor('Green')
              .setDescription(`
              <:pink_reply:1166330261315801158> Cảm ơn <@${message.author.id}> đã đồng ý chấp hành luật, tặng bạn **10000 <:O_o:1135831601205481523> coins**

              <:pink_reply:1166330261315801158>**\`${prefix} job\`** để chọn nghề cho mình ngay nàooooo <a:Anime:1165861221363355769>
              `); 

            a.edit({ embeds: [embed], components: [], content: "" });
            await userData.save();
  
            await client.addTien(message.author.id, 10000);
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
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Collection());
    }
    
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldowns || 1) * 1000;
    
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
