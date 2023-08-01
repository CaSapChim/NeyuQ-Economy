const { Client, Activity, ActivityType, EmbedBuilder, Message } = require("discord.js");
const { initializeMongoose  } = require('../../database/mongoose')

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param { Message } message
     * @param {Client} client 
     */
    async execute(client) {
      client.user.setActivity(`http://discord.gg/neyuq`, {
            type: ActivityType.Streaming, url: "https://www.twitch.tv/nocopyrightsounds"
      });
      await initializeMongoose()
      console.log(`✅ Đăng Nhập Thành Công Vào ${client.user.tag}`.bold.brightBlue);
    }
  };

