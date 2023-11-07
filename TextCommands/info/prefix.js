const Discord = require('discord.js')
const prefixModel = require('../../database/models/prefixModel')

module.exports = {
    name: 'prefix',
    description: 'Thay đổi prefix cho sv',
    adminOnly: true,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {

        let data = await prefixModel.findOne({
            guildId: message.guildId,
            botId: client.user.id
        })

        const prefixName = args[0];
        if (!prefixName) return message.channel.send('Cần cung cấp một **prefix mới** !')
        if(prefixName.length > 5) return message.channel.send('Prefix tối đa 5 kí tự!')

        if (data) {
            data.prefix = prefixName

            message.channel.send(`Prefix mới bây giờ là **\`${prefixName}\`**`)
            
        } else {
            data = new prefixModel({
              prefix: prefixName,
              botId: client.user.id,
              guildId: message.guildId,
            });
            message.channel.send(`Prefix mới bây giờ là **\`${prefixName}\`**`);
        }
        data.save()
    }
}
