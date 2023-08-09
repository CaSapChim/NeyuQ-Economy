const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: ['p', 'ms'],
    description: 'Xem độ trễ của bot',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        message.channel.send(`Pong! Độ trễ của bot là ${client.ws.ping}ms`)
    }
}