const ascii = require('ascii-table')
const fs = require('node:fs')
let table = new ascii("Events");
table.setHeading('Sự Kiện', ' Trạng Thái');

module.exports = (client) => {
  const folders = fs.readdirSync("./Events");
  for (const folder of folders) {
    const files = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const event = require(`../../Events/${folder}/${file}`)

      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args)).setMaxListeners(0);
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args)).setMaxListeners(0);
      }
      table.addRow(file, "✅")
      continue;
    }
  }
  return console.log(table.toString().bold.brightBlue)
}