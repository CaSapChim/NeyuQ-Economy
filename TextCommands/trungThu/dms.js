const { ButtonBuilder , ActionRowBuilder } = require('discord.js')
const Discord = require("discord.js");

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

client.on('interactionCreate', async (interaction) => {
     if (!interaction.isButton()) return;
     if (interaction.customId === 'accept') {
          // Gửi hình ảnh GIF ngay lập tức
          await interaction.reply({ content: 'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif' });
             
          // Tạo một khoảng thời gian chờ 3 giây
          setTimeout(async () => {
          const embed = new Discord.EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('LÁ THƯ TÌNH YÊU?')
          .setImage('https://cdn.discordapp.com/attachments/1080521432032882700/1158393274986418267/Untitled15_20220207110557-2.png?ex=651c154e&is=651ac3ce&hm=ba544b178ff5b7fba187c10b3f41b43425ca9e8866da3e2ab0bee16ceb80ac36&')
          .setDescription(`
          **__ <:love:1124414850328690808> BẠN CÓ 1 LÁ THƯ CỦA NGƯỜI QUAN TRỌNG <:love:1124414850328690808>__**
          -
          ♡　.　⬚   Bức thư của gió là một lá thư từ người xa lạ tuy quen
          ♡　.　🎀  Bức thư là lời chúc 20/10 muốn gửi đế bạn 
          ♡　.　⬚   role`);
          
             
          // Gửi embed sau khi đã chờ 3 giây
     await interaction.editReply({ content: '', embeds: [embed] });
     }, 3000);
     }
     });                             
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
