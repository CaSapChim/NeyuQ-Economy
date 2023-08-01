const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Xem tốc độ phản hồi của bot',
    usage: 'ping',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.ChatInputCommandInteraction} interaction 
     */
    run: async(client, interaction) => {    
        const dt = new Date() - new Date(interaction.createdTimestamp);
        await interaction.reply(`🏓 **Pong** \`${dt}ms\` | ws : \`${client.ws.ping}ms\``).then(msg=>{
            setTimeout(async function () {
              await msg.delete();
            }, 5000)
        })
    }
}