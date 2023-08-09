const Discord = require('discord.js')
const { mine } = require('../../Utils/mineUtils')
const ownerId = require('../../config.json').OWNER_ID

module.exports = {
    name: 'mine',
    description: 'Đập tí đá',
    //cooldown: 12,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {*} userData 
     */
    run: async(client, message, args, userData) => {
      if (!ownerId.includes(message.author.id)) return
      const emojis = {
        'Than': '<:905609870114439208:1134500336862765138>',
        "Sắt": '<:842601384561868810:1134500649548124161>',
        "Vàng": '<:905609869485289482:1134500596871868588>',
        "Kim cương": '<:943215979935187074:1134500706095743150>',
        "Ngọc lục bảo": '<:905609867769839637:1134500619898593380>',
      };

        try {
            const minedResources = mine()
            for ( const resource of minedResources ) {
              const existResource = userData.inventory.find(item => item.name === resource.name)
              if (existResource) {
                existResource.soLuong += resource.soLuong
              } else {
                userData.inventory.push(resource)
              }
            }
            await userData.save()

            const resourceNames = minedResources.map(item => `${emojis[item.name]}`).join(', ');
            message.channel.send(`
            **${message.author.username}**,\n**|** Bạn đang dùng cúp: ...\n**|** Bạn đào được: ${resourceNames}
            `);

        } catch(err) {
            console.log('Lỗi lệnh mine: ', err)
        }
    }
}