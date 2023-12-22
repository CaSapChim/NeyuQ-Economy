const Discord = require('discord.js');
const premiumModel = require('../../database/models/userDataJob/premiumModel');

module.exports = {
    name: "premium",
    aliases: ["pre"],
    description: "Thêm premium cho người chơi",
    adminOnly: true,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const mention = message.mentions.members.first() || message.member;
        const author = message.author;
        let premiumData = await premiumModel.findOne({ userId: author.id });
        if (!premiumData)
            premiumData = new premiumModel({ userId: author.id });
        premiumData.premium = true;
        premiumData.expire = Date.now() + 30 * 24 * 60 * 60 * 1000; // 1 tháng = 30 * 24 * 60 * 60 * 1000
        await premiumData.save();
        message.channel.send(`Đã thêm premium cho ${mention.displayName}`);
    }
}