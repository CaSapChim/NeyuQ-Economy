const Discord = require("discord.js");

module.exports = {
    name: 'doirole',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let author = message.author.id;
        let banhTTDauXanh = await client.nongSan(author, "bánh trung thu nhân đậu xanh");
        let banhTTThapCam = await client.nongSan(author, "bánh trung thu nhân thập cẩm");
        let role = message.guild.roles.cache.find(role => role.id === '1157663287048163368');
        const member = message.guild.members.cache.get(author);

        if (member.roles.cache.has(role.id)) return message.reply("Bạn đã sở hữu role này rồi!");

        let successEmbed = new Discord.EmbedBuilder()
            .setDescription(`<:very:1137010214835597424> Bạn đã đổi thành công role <@&1157663287048163368>`)

        if (banhTTDauXanh >= 10) {
            await client.truNongSan(author, "bánh trung thu nhân đậu xanh", 10);
            await message.member.roles.add(role);
            return message.reply({ embeds: [successEmbed] });
        }
        else if (banhTTThapCam >= 10) {
            await client.truNongSan(author, "bánh trung thu nhân thập cẩm", 10);
            await message.member.roles.add(role);
            return message.reply({ embeds: [successEmbed] });
        }
        else {
            return message.reply("Bạn không đủ 10 bánh trung thu(1 trong 2) để đổi role!");
        }
    }
}