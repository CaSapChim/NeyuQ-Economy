const ascii = require('ascii-table');
const fs = require('node:fs');
let table = new ascii("Commands");
table.setHeading('Lệnh', ' Trạng Thái');

module.exports = (client) => {
  const commandsFolder = fs.readdirSync("./TextCommands");
  for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./TextCommands/${folder}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../../TextCommands/${folder}/${file}`);
      if (commandFile) {
        client.commands.set(commandFile.name, commandFile)
        table.addRow(file, "✅");
      } else {
        table.addRow(file, '❌ - Lỗi')
        continue;
      }
      if (commandFile.aliases && commandFile.aliases.length > 0 && Array.isArray(commandFile.aliases)) commandFile.aliases.forEach(alias => client.aliases.set(alias, commandFile.name))
    }
  }
  return console.log(table.toString().bold.brightBlue);
}