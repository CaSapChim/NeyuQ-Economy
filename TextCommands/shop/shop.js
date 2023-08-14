const { Client, Message, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "shop",
  description: "Xem danh sách các lệnh của bot",
  aliases: ["cuahang", "store"],
  run: async (client, message, args, userData) => {
    const helpMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("shop_menu")
        .setPlaceholder("Shop Menu")
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([
          { label: "Hoa", description: "Quầy bán hoa", value: "flower", emoji: "<:shopbnhoa:1123907266609946624>" },
          { label: "Nhẫn", description: "Quầy bán nhẫn", value: "ring", emoji: "<:Nhnvng:1124056797238534375>" },
          { label: "Role", description: "Quầy bán role", value: "role", emoji: "<:shoprole:1124059582805856267>" },
          { label: "Rương", description: "Quầy bán rương", value: "chest", emoji: "<:rng:1124057508177256598>" },
          { label: "Dụng cụ", description: "Quầy bán dụng cụ", value: "tool", emoji: "<:tools31:1140599375043764254>" }
        ])
    );

    const editEmbed = new EmbedBuilder()
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
      .setTimestamp()
      .setFooter({ text: 'Chúc bạn một ngày tốt lành'})

    const a = await message.channel.send({ embeds: [editEmbed], components: [helpMenu] });

    client.on("interactionCreate", async (interaction) => {
      if (interaction.user.id !== message.author.id) return;

      if (interaction.isStringSelectMenu() && interaction.customId === "shop_menu") {
        if (!interaction.deferred) {
          await interaction.deferUpdate();

          let responseEmbed;

          if (interaction.values[0] === "flower") {
            responseEmbed = new EmbedBuilder()
              .setTitle("Quầy Bán Hoa")
              .setDescription(`
                  <:chamxanh:1124058113742479400> \`20\` <a:p_flower22:1135636392374960310> Bông Hoa | \`1,500\` <:O_o:1135831601205481523> coins 
                  
                  <:chamxanh:1124058113742479400> \`21\` <:bbng:1124017699614371890> Bó Bông | \`3,000\` <:O_o:1135831601205481523> coins
                  
                  <:chamxanh:1124058113742479400> \`22\` <:ko:1124018356949884928> Cục Kẹo | \`5,000\` <:O_o:1135831601205481523> coins
                  
                  <:chamxanh:1124058113742479400> \`23\` <:socola:1124018847511478372> Socola | \`8,000\` <:O_o:1135831601205481523> coins
                  
                  <:chamxanh:1124058113742479400> \`24\` <:gubng:1124018585275211867> Gấu Bông | \`12,000\` <:O_o:1135831601205481523> coins
              `)
              .setColor(0x0099ff)
              .setImage('https://i0.wp.com/boingboing.net/wp-content/uploads/2015/07/tumblr_noa6mdd3yb1qze3hdo1_500.gif?resize=500%2C288')
              .setTimestamp()
              .setFooter({ text: 'Chúc bạn một ngày tốt lành'})
          } else if (interaction.values[0] === "ring") {
            responseEmbed = new EmbedBuilder()
              .setTitle("Quầy Bán Nhẫn")
              .setDescription(`
              <:chamvang:1125863859740225556> \`25\` <:nhnbc:1124056817048240159> Nhẫn Bạc: | \`80,000\` <:O_o:1135831601205481523> coins 
                              
              <:chamvang:1125863859740225556> \`26\` <:Nhnvng:1124056797238534375> Nhẫn Vàng: | \`150,000\` <:O_o:1135831601205481523> coins 
                          
              <:chamvang:1125863859740225556> \`27\` <:nhan:1124415305347780720> Nhẫn Hồng: | \`250,000\` <:O_o:1135831601205481523> coins
              `)
              .setColor(0xe49300)
              .setImage('https://64.media.tumblr.com/6f39e453ebb570672af6ebcd0478cac6/tumblr_inline_plss2yuzfK1tiiqk5_540.gif')
              .setTimestamp()
              .setFooter({ text: 'Chúc bạn một ngày tốt lành'})
          } else if (interaction.values[0] === "role") {
         
  
             responseEmbed = new EmbedBuilder()
              .setTitle("Quầy Bán Role")
              .setDescription(`
             
                <:chamhong:1125869563838472364> \`28\` <@&1124062125229346920> | \`25,000\` <:O_o:1135831601205481523> coins
                
                <:chamhong:1125869563838472364> \`29\` <@&1125641678913548299> | \`50,000\` <:O_o:1135831601205481523> coins
                
                <:chamhong:1125869563838472364> \`30\` <@&1125641802574209055> | \`100,000\` <:O_o:1135831601205481523> coins
                
                <:chamhong:1125869563838472364> \`31\` <@&1125641989174595594> | \`150,000\` <:O_o:1135831601205481523> coins
              `)
              .setColor("Aqua")
              .setImage('https://i.pinimg.com/originals/04/9c/0c/049c0cbf9ed52f024086ff32dd8603e1.gif')
              .setTimestamp()
              .setFooter({ text: 'Chúc bạn một ngày tốt lành'})

          } else if (interaction.values[0] === "chest") {
        
  
             responseEmbed = new EmbedBuilder()
              .setTitle("Quầy Bán Rương")
              .setDescription(`
              
                <:chamvang:1125863859740225556> \`32\` <:ruongbac:1135643679256756374> Rương Bạc | \`15,000\`<:O_o:1135831601205481523> coins
                
                <:chamvang:1125863859740225556> \`33\` <:ruongvang:1135643685476896789> Rương Vàng | \`30,000\`<:O_o:1135831601205481523> coins
                
                <:chamvang:1125863859740225556> \`34\` <:rngkimcuong:1135643691814494278> Rương Đặc Biệt | \`50,000\`<:O_o:1135831601205481523> coins
              `)
              .setColor("Random")
              .setFooter({ text: 'Chúc bạn một ngày tốt lành'})
              .setTimestamp()
          } else if (interaction.value[0] === 'tool' ) {
            responseEmbed = new EmbedBuilder()
              .setTitle('Quần bán dụng cụ')
              .setDescription(`
              <:chamxanh:1124058113742479400> \`40\` <:wooden_pickaxe:1134750444854444042> | <:O_o:1135831601205481523> coins

              <:chamxanh:1124058113742479400> \`41\` <:905609866691891220:1134749977529299014> | <:O_o:1135831601205481523> coins

              <:chamxanh:1124058113742479400> \`42\` <:mcmine:1134750599188062350> | <:O_o:1135831601205481523> coins

              <:chamxanh:1124058113742479400> \`43\` <:Gold_Pickaxe:1134749444785578034> | <:O_o:1135831601205481523> coins

              <:chamxanh:1124058113742479400> \`44\` <:diamond_pickaxe:1134749671613550592> | <:O_o:1135831601205481523> coins

              <:chamxanh:1124058113742479400> \`50\` <:Flimsy_Fishing_Rod_NH_Icon:1140523577821626438> | <:O_o:1135831601205481523> coins

              <:chamxanh:1124058113742479400> \`51\` <:pro_fishing_rod49:1140523548763500665> | <:O_o:1135831601205481523> coins

              <:chamxanh:1124058113742479400> \`52\` <:Flimsy_Net_NH_Icon:1140523599170654298> | <:O_o:1135831601205481523> coins
              
              <:chamxanh:1124058113742479400> \`53\` <:Golden_Net_NH_Inv_Icon:1140523506656874496> | <:O_o:1135831601205481523> coins
              `)
              .setTimestamp()
              .setFooter({ text: 'Chúc bạn một ngày tốt lành'})
          }

          if (responseEmbed) {
            await a.edit({ embeds: [responseEmbed] })
          }
        }
      }
    });
  }
};