const Discord = require('discord.js')

module.exports = {
    name: 'gift',
    aliases: ['tangqua'],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const mention = message.mentions.users.first()
        if (!mention) return

        let type = args[1].toLowerCase()
 
        if ( type == 'bonghoa' ) { 
            message.channel.send(`<@${message.author.id}> **đã tặng bông hoa <a:p_flower22:1135636392374960310> cho <@${mention.id}>**`)
            await client.addMarryLevel(message.author.id, mention.id, 20)
        } else if ( type == 'bobong' ) {
            message.channel.send(`<@${message.author.id}> **đã tặng bó bông <:bbng:1124017699614371890> cho <@${mention.id}>**`)
            await client.addMarryLevel(message.author.id, mention.id, 50)
        } else if ( type == 'cuckeo' ) {
            message.channel.send(`<@${message.author.id}> **đã tặng cục kẹo <:ko:1124018356949884928> cho <@${mention.id}>**`)
            await client.addMarryLevel(message.author.id, mention.id, 80)
        } else if ( type == 'socola' ) {
            message.channel.send(`<@${message.author.id}> **đã tặng socola <:socola:1124018847511478372> cho <@${mention.id}>**`)
            await client.addMarryLevel(message.author.id, mention.id, 120)
        } else if ( type == 'gaubong' ) {
            message.channel.send(`<@${message.author.id}> **đã tặng gấu bông <:gubng:1124018585275211867> cho <@${mention.id}>**`)
            await client.addMarryLevel(message.author.id, mention.id, 150)
        } 

    }
}