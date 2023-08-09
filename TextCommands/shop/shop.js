const {
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  Client,
  Message,
  StringSelectMenuBuilder,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "shop",
  description: "Xem danh sách các lệnh của bot",
  aliases: ["cuahang", "store"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {*} args
   * @returns
   */
  run: async (client, message, args, userData) => {
    let helpMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("shop_menu")
        .setPlaceholder("Shop Menu")
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
           {
            label: "Hoa",
            description: "Quầy bán hoa",
            value: "flower",
            emoji: "<:shopbnhoa:1123907266609946624>",
          }, 
          {
            label: "Nhẫn",
            description: "Quầy bán nhẫn",
            value: "ring",
            emoji: "<:Nhnvng:1124056797238534375>",
          },
          {
            label: "Role",
            description: "Quầy bán role",
            value: "role",
            emoji: "<:shoprole:1124059582805856267>",
          },
          {
            label: "Rương",
            description: "Quầy bán rương",
            value: "chest",
            emoji: "<:rng:1124057508177256598>",
          }
         
        ])
    );

    let editEmbed = new EmbedBuilder()
      .setTitle('Chào mừng bạn đã đến shop của chúng tôi!')
      .setDescription(`
      
        <:shopbnhoa:1123907266609946624> **Quầy Bán Hoa**
        ㅤㅤ• Mua các loại hoa đang bán
        
        <:nhan:1124415305347780720> **Quầy Bán Nhẫn**
        ㅤㅤ• Mua các loại nhẫn đang có
        
        <:shoprole:1124059582805856267> **Quầy bán role**
        ㅤㅤ• Mua các loại role trong shop
        
        <:rng:1124057508177256598> **Quầy Gacha**
        ㅤㅤ• Mua các loại rương gacha
      `)
      .setColor("Green")
      .setImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ceab6b05-066e-4f6b-82ab-d8d718e2cbb5/dc5eydb-6e88187a-9aae-4800-a8b8-65c488b4f3fe.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NlYWI2YjA1LTA2NmUtNGY2Yi04MmFiLWQ4ZDcxOGUyY2JiNVwvZGM1ZXlkYi02ZTg4MTg3YS05YWFlLTQ4MDAtYThiOC02NWM0ODhiNGYzZmUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0kOLnE_p2Wd8wfzKxZU426XYjVS-mnrXbT1m-jO9fas')

    message.channel
      .send({ embeds: [editEmbed], components: [helpMenu] })
      .then((msg) => {
        setTimeout(async function () {
          await msg.delete();
        }, 180000);
      });
      client.on("interactionCreate", async interaction => {
        if (interaction.user.id !== message.author.id) return interaction.reply({
          content: 'Nút này không phải dành cho bạn!',
          ephemeral: true
        })
        if (interaction.isStringSelectMenu()) {
          if (interaction.customId === "shop_menu") {
    
            if (interaction.values[0] === "flower") {
              await interaction.deferUpdate();
    
              const modEmbed = new EmbedBuilder()
                .setTitle("Quầy Bán Hoa")
                .setDescription(`
    
                  <:chamxanh:1124058113742479400> \`20\` <a:p_flower22:1135636392374960310> Bông Hoa | \`1,000\` <:O_o:1135831601205481523> coins 
                  
                  <:chamxanh:1124058113742479400> \`21\` <:bbng:1124017699614371890> Bó Bông | \`2,000\` <:O_o:1135831601205481523> coins
                  
                  <:chamxanh:1124058113742479400> \`22\` <:ko:1124018356949884928> Cục Kẹo | \`3,000\` <:O_o:1135831601205481523> coins
                  
                  <:chamxanh:1124058113742479400> \`23\` <:socola:1124018847511478372> Socola | \`5,000\` <:O_o:1135831601205481523> coins
                  
                  <:chamxanh:1124058113742479400> \`24\` <:gubng:1124018585275211867> Gấu Bông | \`10,000\` <:O_o:1135831601205481523> coins
                `)
                .setColor(0x0099ff)
                .setImage('https://i0.wp.com/boingboing.net/wp-content/uploads/2015/07/tumblr_noa6mdd3yb1qze3hdo1_500.gif?resize=500%2C288')
              await interaction.editReply({ embeds: [modEmbed], ephemeral: true });
            }
            else if (interaction.values[0] === "ring") {
              await interaction.deferUpdate();
          
              const infoEmbed = new EmbedBuilder()
                .setTitle("Quầy Bán Nhẫn")
                .setDescription(`
                
                  <:chamvang:1125863859740225556> \`25\` <:nhnbc:1124056817048240159> Nhẫn Bạc: | \`50,000\` <:O_o:1135831601205481523> coins\n 
                              
                  <:chamvang:1125863859740225556> \`26\` <:Nhnvng:1124056797238534375> Nhẫn Vàng: | \`100,000\` <:O_o:1135831601205481523> coins\n 
                              
                  <:chamvang:1125863859740225556> \`27\` <:nhan:1124415305347780720> Nhẫn Hồng: | \`150,000\` <:O_o:1135831601205481523> coins\n 
                `)
                .setColor(0xe49300)
                .setImage('https://64.media.tumblr.com/6f39e453ebb570672af6ebcd0478cac6/tumblr_inline_plss2yuzfK1tiiqk5_540.gif')
    
              await interaction.editReply({ embeds: [infoEmbed], ephemeral: true });
            } else if (interaction.values[0] === "role") {
              await interaction.deferUpdate();
    
              const modEmbed = new EmbedBuilder()
                .setTitle("Quầy Bán Role")
                .setDescription(`
               
                  <:chamhong:1125869563838472364> \`28\` <@&1124062125229346920> | \`15,000\` <:O_o:1135831601205481523> coins
                  
                  <:chamhong:1125869563838472364> \`29\` <@&1125641678913548299> | \`30,000\` <:O_o:1135831601205481523> coins
                  
                  <:chamhong:1125869563838472364> \`30\` <@&1125641802574209055> | \`50,000\` <:O_o:1135831601205481523> coins
                  
                  <:chamhong:1125869563838472364> \`31\` <@&1125641989174595594> | \`100,000\` <:O_o:1135831601205481523> coins
                `)
                .setColor("Random")
                .setImage('https://i.pinimg.com/originals/04/9c/0c/049c0cbf9ed52f024086ff32dd8603e1.gif')
    
              await interaction.editReply({ embeds: [modEmbed], ephemeral: true });
            } else if (interaction.values[0] === "chest") {
              await interaction.deferUpdate();
    
              const modEmbed = new EmbedBuilder()
                .setTitle("Quầy Bán Rương")
                .setDescription(`
                
                  <:chamvang:1125863859740225556> \`32\` <:ruongbac:1135643679256756374> Rương Bạc | \`10,000\`<:O_o:1135831601205481523> coins
                  
                  <:chamvang:1125863859740225556> \`33\` <:ruongvang:1135643685476896789> Rương Vàng | \`20,000\`<:O_o:1135831601205481523> coins
                  
                  <:chamvang:1125863859740225556> \`34\` <:rngkimcuong:1135643691814494278> Rương Đặc Biệt | \`30,000\`<:O_o:1135831601205481523> coins
                `)
                .setColor("Random");
              await interaction.editReply({ embeds: [modEmbed], ephemeral: true });
            } 
          }
        }
      })
    },
};
