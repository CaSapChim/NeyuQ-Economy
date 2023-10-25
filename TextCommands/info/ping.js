const { Client, Message } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["p"],
    description: "Xem độ trễ của bot",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
    run: async (client, message, args) => {
      const dt = new Date() - new Date(message.createdTimestamp);
      await message.reply(`**Độ trễ tin nhắn** \`${dt}ms\`\n**Websocket** : \`${client.ws.ping}ms\``)
  }
}  