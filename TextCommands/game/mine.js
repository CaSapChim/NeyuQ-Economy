const Discord = require('discord.js');
const { mine } = require('../../Utils/mineUtils');
const { Captcha } = require('../../Utils/captchaUtils')
const trackingMineModel = require('../../database/models/trackingMineModel')
const verifiedModel = require('../../database/models/verifiedModel')
const { dropTreasure } = require('../../Utils/dropTreasureUtils');

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
  cooldowns: 15,
  adminOnly: false,
  /**
   * 
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @returns 
   */
  run: async (client, message) => {
    try {
      let verifyData = await verifiedModel.findOne({ userId: message.author.id })
      if (verifyData) return message.reply('**Vui lòng nhập captcha để tiếp tục sử dung bot**')
      await Captcha(client, message)
      const minedResources = await mine(client, message);
      await dropTreasure(client, message);

      let dataMine = await trackingMineModel.findOne({
        userId: message.author.id
      })
  
      if (!dataMine) {
        dataMine = new trackingMineModel({
            userId: message.author.id,
        })
      }
      await dataMine.save()
      
      if (dataMine.enable == true) {
        setTimeout(() => {
          message.reply(`${dataMine.text.length === 0 ? `\`nqg mine\` đã sẵn sàng!` : dataMine.text}`)
        }, 30000);
      }
      
      if (minedResources.length === 0) {
        message.reply('Bạn chưa sử dụng cúp để đào')
        return
      }

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
