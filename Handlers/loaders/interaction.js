const ascii = require('ascii-table');
const fs = require('node:fs');
const slashCommands = [];

let table = new ascii("Slash Commands");
table.setHeading('Lệnh', ' Trạng Thái');

module.exports = (client) => {
  const commandsFolder = fs.readdirSync("./SlashCommands");
  for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./SlashCommands/${folder}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../../SlashCommands/${folder}/${file}`);
      if(commandFile.name) {
        client.interactions.set(commandFile.name, commandFile);
        slashCommands.push(commandFile);
        table.addRow(file, '✅')
      } else {
        table.addRow(file, '❌ - Lỗi')
        continue;
      }
    }
  }

  client.once('ready', async () => {
    await client.application.commands.set(slashCommands);
  });

  console.log(table.toString().bold.brightBlue);
}