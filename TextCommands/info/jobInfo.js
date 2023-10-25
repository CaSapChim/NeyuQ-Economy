const Discord = require("discord.js");
const userModel = require('../../database/models/userDataJob/userModel');

module.exports = {
    name: "jobinfo",
    aliases: ["cj", "checkjob"],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async (client, message, args) => {
        const member =
        message.mentions.members.first() ||
        message.guild.members.cache.find((u) => u.id === args[0] || u.user.username === args[0]) ||
        message.member;

        const typeOfJob = await client.checkJob(member.id);
        if(typeOfJob == 0) 
            return message.reply("<:pink_reply:1166330261315801158> Người dùng này chưa có nghề nghiệp.");
        const jobLevel = await client.checkJobLevel(member.id);

        const userData = await userModel.findOne({ userId: member.id });

        const currentExpJob = userData.job.currentExpJob;
        const maxExpJob = userData.job.maxExpJob;

        const jobEmoji = {
            "Ngư dân": "<a:Minecraft_Fish:1166253935808499743>",
            "Thợ mỏ": "<a:mcenchantedpicka:1166253932545323008>",
            "Nông dân": "<a:minecraftenchant:1166253939658866698>",
        }

        

        const jobInfoEmbed = new Discord.EmbedBuilder()
            .setColor(typeOfJob === "Ngư dân" ? "Blue" : typeOfJob === "Thợ mỏ" ? "Gold" : "Green")
            .setDescription(`
            :briefcase: **Hồ sơ nghề nghiệp của <@${member.id}>** :briefcase: 

            <:pink_reply:1166330261315801158> Nghề nghiệp: **${typeOfJob} ${jobEmoji[typeOfJob]}**

            <:pink_reply:1166330261315801158> Level: **${jobLevel} - ${currentExpJob}/${maxExpJob}**

            `)
            .setThumbnail(member.displayAvatarURL())
            .setTimestamp()
        await message.reply({ embeds: [jobInfoEmbed] });
  }
}  