const { EmbedBuilder } = require('discord.js');
const path = require('path');
const sourceEmoji = require('../../emoji.json');
const fs = require('fs')

module.exports = async ({ client, interaction, values }) => {
     await interaction.deferReply({ ephemeral: true })
     if (values[0] === "Admin" && !configure.opt.idDev?.includes(interaction.user.id)) {
          return await interaction.editReply({
          embeds: [
               new EmbedBuilder()
                    .setAuthor({ name: `❌ Menu hướng dẫn này không phải dành cho bạn!` })
          ],
          ephemeral: true
     })}
     const commandCategoriesPaths = getAllFiles(
          path.join(__dirname, '..', '..', 'TextCommands'),
          true
     );

     function createEmbedForCommand(category) {
          const commandObjects = [];
          const commandCategories = commandCategoriesPaths.filter(value => value.split("\\").pop() === category);
          for (const commandCategory of commandCategories) {
               const commandFiles = getAllFiles(commandCategory);

               for (const commandFile of commandFiles) {
                    const commandObject = require(commandFile);
                    if (commandObject?.showHelp === false) continue;
                    commandObjects.push(commandObject);
               }
          }

          const fields = (commandObject) => {

               return commandObject.map(element => {
                    return {
                         name: `**Cách dùng** : \`nqg ${element.name} ${element?.tips ? element.tips : ''}\` ${element?.adminOnly ? `<:Moderators:1129122776800821259>` : ''}`,
                         value: `${element.description} - Các lệnh rút gọn : \`${element?.aliases ? element.aliases : "Không có"}\``,
                         inline: false
                    }
               })
          }
          const nameOfCommand = (commandObject) => {
               return commandObject.map(element => `\`${element.name}\``).join(' , ')
          }

          const emoji = sourceEmoji.emojihelp;

          const resultEmbed = new EmbedBuilder()
               .setColor("Fuchsia")
               .setTitle(`${emoji?.[category]} ${category} - (${commandObjects.length}) ${nameOfCommand(commandObjects)}`)
               .addFields(fields(commandObjects))
               .setTimestamp()
               .setFooter({ text: `Prefix của bot là nqg`, iconURL: client.user.displayAvatarURL() });
          return resultEmbed;
     }
     const helpEmbeds = []
     for (const key of values) {
          const temp = createEmbedForCommand(key);
          helpEmbeds.push(temp)
     } 
     await interaction.editReply({ embeds: helpEmbeds });

}

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
          console.log("Skip read folders!", error);
     }

     return fileNames;
}