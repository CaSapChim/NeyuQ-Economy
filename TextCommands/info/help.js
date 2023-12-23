const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const path = require('path');
const sourceEmoji = require('../../emoji.json');
const fs = require('fs')

module.exports = {
     name: 'cuutoi',
     description: "xem tất cả lệnh mà bot đang có",
     aliases: ['cuutoivoi', 'h'],
     showHelp: false,

     run: async (client, message, args) => {
          const emoji = sourceEmoji.emojihelp;
          const emojiId = sourceEmoji.emojihelpid;

          const commandFolders = getAllFiles(path.join(__dirname, '..'), true)
               .map((value) => value.split("\\").pop().split('.').shift());
               
          function createSelectMenuOption(categoryName) {
               let result = [];
               for (const category of categoryName) {
                    const optionMenu = new StringSelectMenuOptionBuilder()
                         .setDescription(`Xem các lệnh về ${category}!`)
                         .setLabel(category)
                         .setValue(category)
                    if (emojiId?.[category]) {
                         optionMenu.setEmoji(emojiId?.[category])
                    }
                    
                    result.push(optionMenu);
               }
               return result;
          }

          const menu = new StringSelectMenuBuilder()
               .setCustomId('help')
               .setPlaceholder('Help menu')
               .setMinValues(1)
               .setMaxValues(5)
               .addOptions(createSelectMenuOption(commandFolders));
          const row1 = new ActionRowBuilder().addComponents(menu);
          
          const helpString = commandFolders.map((value) => {
               return `${emoji?.[value]} \`:\` **${value}** `
          }).join("\n");
          const embed = new EmbedBuilder()
               .setColor('Fuchsia')
               .setAuthor({ name: "BẢNG LỆNH LOLI BOT GAME" })
               .setDescription(`Chào mừng ${message.author.toString()} đến với sở thú - ||LOLI||. \n Bot được phát triển bởi <@479182625764802560> <@874321270437728257> và <@942356413546635264>`)
               .addFields([
                    {
                         name: `- Các loại lệnh của Bot \n `,
                         value: helpString + '\n \n ● [NeyuQ-server](https://discord.gg/neyuq)',
                         inline: false
                    }
               ])
               .setThumbnail(client.user.displayAvatarURL())
               .setTimestamp()
               .setFooter({ text: `Prefix của bot là nqg` });

          await message.reply({ embeds: [embed], components: [row1] });
     },
};

function getAllFiles(directory, foldersOnly = false) {
     const fileNames = [];
     try {
          const files = fs.readdirSync(directory, { withFileTypes: true });
          for (const file of files) {
               const filePath = path.join(directory, file.name);

               if (foldersOnly) {
                    if (file.isDirectory()) {
                         fileNames.push(filePath);
                    }
               } else {
                    if (file.isFile()) {
                         fileNames.push(filePath);
                    }
               }
          }

     } catch (error) {
          console.log("Skip read folders!");
     }

     return fileNames;
}