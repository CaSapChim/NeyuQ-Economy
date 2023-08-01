const Discord = require('discord.js')
const prefixModel = require('../../database/models/prefixModel')

module.exports = {
    name: 'prefix',
    description: 'Thay đổi prefix cho sv',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const data = prefixModel.findOne({
            guildId: message.guild.id
        })

        const prefixName = args[0];
        if (!prefixName) return message.channel.send('Cần cung cấp một **prefix mới** !')
        if(prefixName.length > 5) return message.channel.send('Prefix tối đa 5 kí tự!')

        if (data) {
            await prefixModel.findOneAndRemove({
                guildId: message.guild.id
            })

            let newPrefix = new prefixModel({
                prefix: prefixName,
                guildId: message.guild.id
            })
            newPrefix.save()
            message.channel.send(`Prefix mới bây giờ là **\`${prefixName}\`**`)
            
        } else if (!data) {
            message.channel.send(`Prefix mới bây giờ là **\`${prefixName}\`**`);
      
            let newPrefix = new prefixModel({
              prefix: prefixName,
              guildId: message.guild.id,
            });
            newPrefix.save();
          }
    }
}
