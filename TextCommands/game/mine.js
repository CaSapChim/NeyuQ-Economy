const Discord = require('discord.js');
const { mine } = require('../../Utils/mineUtils');
const { OWNER_ID } = require('../../config.json');
const { Captcha } = require('../../Utils/captchaUtils')

const BUFF_CUPS = {
  3: { emoji: '<:wooden_pickaxe:1134750444854444042>', count: 25 },
  6: { emoji: '<:905609866691891220:1134749977529299014>', count: 50 },
  9: { emoji: '<:mcmine:1134750599188062350>', count: 100 },
  12: { emoji: '<:Gold_Pickaxe:1134749444785578034>', count: 200 },
  15: { emoji: '<:diamond_pickaxe:1134749671613550592>', count: 300 }
};

const RESOURCE_EMOJIS = {
  'Than': '<:905609870114439208:1134500336862765138>',
  'Sắt': '<:842601384561868810:1134500649548124161>',
  'Vàng': '<:905609869485289482:1134500596871868588>',
  'Kim cương': '<:943215979935187074:1134500706095743150>',
  'Ngọc lục bảo': '<:905609867769839637:1134500619898593380>'
};

module.exports = {
  name: 'mine',
  description: 'Đập tí đá',
  cooldown: 60,
  /**
   * 
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @returns 
   */
  run: async (client, message) => {
    try {
      await Captcha(client, message)
      const minedResources = await mine(client, message);

      if (minedResources.length === 0) {
        message.reply('Bạn chưa sử dụng cúp để đào')
        return
      }

      await message.channel.send(`**${message.author.username},** đang đào...`).then(msg =>{
        setTimeout(async () => {
          await msg.delete()
        }, 5000);
      });
      await new Promise(resolve => setTimeout(resolve, 5000));

      for (const resource of minedResources) {
        await client.addKS(message.author.id, resource.name, resource.soLuong);
      }

      const buffPromises = Array.from({ length: 5 }, (_, i) => client.buffMine(message.author.id, i + 1));
      const buffResults = await Promise.all(buffPromises);

      for (const [i, buff] of buffResults.entries()) {
        const buff = buffResults[i];
        if (buff > 0) { 
          const minedResourceCount = minedResources.length;
          const { emoji, count } = BUFF_CUPS[minedResourceCount] || { emoji: 'Không có', count: 0 };
          const resourceNames = minedResources.map(item => RESOURCE_EMOJIS[item.name]).join(' ');

          await message.reply(`**${message.author.username},**\n**|** Bạn đang dùng cúp: ${emoji} \`(${buff - 1}/${count})\`\n**|** Bạn đào được:${resourceNames}`);
        } 
      }
    } catch (err) {
      console.log('Lỗi lệnh mine: ', err);
    }
  }
};
