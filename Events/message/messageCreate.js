const {
  Collection,
  Client,
  Message,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const prefixModel = require("../../database/models/prefixModel");
const banModel = require("../../database/models/banModel.js");
const { dropGift } = require('../../Utils/dropGiftUtil.js');
const ownerId = require('../../dontPushMe/config.json').OWNER_ID
const emoji = require('../../emoji.json');
const userModel = require("../../database/models/userDataJob/userModel.js");
const premiumModel = require('../../database/models/userDataJob/premiumModel.js');

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

    let premiumData = await premiumModel.findOne({ userId: message.author.id });
    const currentDate = Date.now();

    if (premiumData) {
      if (premiumData.premium == true && premiumData.expire < currentDate) {
        premiumData.premium = false;
        premiumData.expire = null;
        await premiumData.save();
        const member = message.guild.members.cache.get(premiumData.userId);
        await member.send("Premium của bạn đã hết hạn");
      }
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
    // if (!client.dev.has(command.name)) 
    //   client.dev.set(command.name, new Collection()); // client.dev.set(ping, [ownerId]);
    // const isDev = client.dev.get(command.name);
    // if (isDev) {
    //   if (!ownerId.includes(message.author.id))
    //     return message.reply(`${emoji.fail} Lệnh chỉ dành cho owner và developer!`).then(msg => {
    //       setTimeout(() => {
    //         msg.delete();
    //       }, 3000);
    //     });
    // } 

    if (!command) return;

    if (!message.guild) return;
    
    if (Object.keys(command).length === 0) return;
    
    if (!ownerId.includes(message.author.id)) return message.reply(`${emoji.fail} | Chỉ developer mới có quyền dùng!`)
      .then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      })  

      const userData = await userModel.findOne({ userId: message.author.id });
      if (!userData && command.name !== "dangky") return message.reply('Bạn chưa thể dùng được bot.\nDùng lệnh **`nqg dangky`** để cấu hình tài khoản.');
    // let allowedCommand = ['cash', 'bal', 'money', 'ping', 'p', 'hun', 'give', 'marry', 'totinh', 'rela', 'banbe', 'ketban', 'mayman', 'fa', 'gift']
    // let allowedChannelId = ['1105078320644755486', '1141248052200472586', '1117459580927086622', '1117459513923096597']

    // if (!allowedCommand.includes(cmd) && !ownerId.includes(message.author.id)) {
    //   if (!allowedChannelId.includes(message.channel.id)) {
    //     return
    //   }  
    // } 

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

    try {
      // if (command.adminOnly && !ownerId?.includes(message.author.id)) return message.reply(`${emoji.fail} | Lệnh chỉ dành cho developer!`)
      // .then(msg => {
      //   setTimeout(() => {
      //     msg.delete();
      //   }, 3000);
      // })
      await command.run(client, message, args);
    } catch (e) {
      console.error("Lỗi: ", e);
    }
  },
};
