const { Collection, Client, Message, EmbedBuilder } = require("discord.js");
const client = require('../../index')
const userModel = require('../../database/models/userModel.js')
const prefixModel = require('../../database/models/prefixModel')

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

    // Lấy thông tin người dùng và chuyển đến lệnh
    let userData
    try {
      
      userData = await userModel.findOne({userId: message.author.id})
    } catch(err) {
      console.log('Lỗi userModel', err)
    } 


    let data = await prefixModel.findOne({
      guildId: message.guild.id
    })
    
    if (data) {
      var prefix = data.prefix
    } else {
      prefix = '!'
    }
    
    const content = message.content.toLowerCase();
    if (!content.startsWith(prefix)) return;
    const args = content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift();
    const command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;

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
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `Vui lòng chờ ${timeLeft.toFixed(1)} giây để dùng lại lệnh \`${
            command.name
          }\``
        ).then(msg => {
          setTimeout(() => {
            msg.delete()
          }, 5000)
        });
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
