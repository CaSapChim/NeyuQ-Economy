const { ButtonBuilder , ActionRowBuilder } = require('discord.js')

module.exports = {
  name: "dms",
  description: "Gửi 1 tin nhắn cho người yêu",
  aliases: ["nhantin", "dms"],

  run: async (client, message, args) => {
    if (!message.mentions.users.size) {
      return message.reply("Bạn cần phải tag một người dùng để gửi tin nhắn!");
    }
    const taggedUser = message.mentions.users.first();
    args.shift()
    if (args.length <= 0) {
     return message.reply("Bạn cần phải nhập tin nhắn !!!!");
    }
    const messageContent = args.join(" ");

    const accept = new ButtonBuilder()
     .setCustomId("accept")
     .setLabel("Mày có chấp nhận ko ?")
     .setStyle("Primary")

     const row = new ActionRowBuilder().addComponents(accept);
    

    await client.users.fetch(taggedUser.id, false).then((user) => {
          Promise.all([
               user.send({
                    content: messageContent,
                    components: [row]
               }),
               message.channel.send(`Tin nhắn đã được gửi đến: ${taggedUser.username}`)
          ])
     }).catch((error) => {
          console.error(`Không thể gửi DM đến ${taggedUser.username}.\n`, error);
          message.channel.send(`Xin lỗi, không thể gửi tin nhắn đến ${taggedUser.username} vì: ${error}`);
     });
     
     
     // helpchannel.send({
     //      content: "welcome to site",
     //      components: [
     //        new messageactionrow().addcomponents([button])
     //      ]
     //    })

    // taggedUser.send(args.join(" "))
    //     .then(() => {
    //         if (message.content.startsWith('dms')) {
    //             message.channel.send(`Tin nhắn đã được gửi đến: ${taggedUser.username}`);
    //         }// m nghe t nói đk
    //     })
    //     .catch(error => {
    //         console.error(`Không thể gửi DM đến ${taggedUser.username}.\n`, error);
    //         message.channel.send(`Xin lỗi, không thể gửi tin nhắn đến ${taggedUser.username} vì: ${error}`);
    //     });
  },
};
