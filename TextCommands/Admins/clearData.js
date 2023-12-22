const Discord = require('discord.js');

module.exports = {
    name: "clear",
    aliases: ["clear"],
    adminOnly: true,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const userData = message.mentions.members.first();
        if (!userData) {
            await message.reply("Đã xóa tất cả dữ liệu của tất cả người dùng");
        }
    }
}