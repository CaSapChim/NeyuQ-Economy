const Discord = require("discord.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  /**
   *
   * @param {Discord.Client} client
   * @param {import('discord.js').Interaction} interaction
   * @returns
   */
  async execute(client, interaction) {
    if (interaction.isCommand()) {
      const command = client.interactions.get(interaction.commandName);
      if (!command) return;

      if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
      }
      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = command.cooldown * 1000;
      if (timestamps.has(interaction.user.id)) {
        const expirationTime =
          timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = Math.round(expirationTime / 1000);
          return interaction.reply({
            content: `Vui lòng chờ <t:${timeLeft}:R> để sử dụng lại lệnh này!`,
            ephemeral: true,
          });
        }
      }
      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

      try {
        await command.run(client, interaction);
      } catch (err) {
        console.error(err);
        interaction.reply({
          content: `<a:canh_bao:1131124005982720020> Đã có lỗi xảy ra khi sử dụng lệnh!`,
          ephemeral: true,
        });
      }
    }

    /////////////////////////////////////////////
    /////////////////////SHOP MENU///////////////////

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "shop_menu") {
        if (interaction.values[0] === "ring") {
          await interaction.deferUpdate();
      
          const infoEmbed = new Discord.EmbedBuilder()
            .setTitle("Quầy Bán Nhẫn")
            .setDescription(`
            
<:chamvang:1125863859740225556> \`25\` <:nhnbc:1124056817048240159> Nhẫn Bạc: | \`50,000\`\n
            
<:chamvang:1125863859740225556> \`26\` <:Nhnvng:1124056797238534375> Nhẫn Vàng: | \`100,000\`\n
            
<:chamvang:1125863859740225556> \`27\` <:nhan:1124415305347780720> Nhẫn Đặc Biệt: | \`150,000\`\n
            `)
            .setColor(0xe49300)
            .setImage('https://64.media.tumblr.com/6f39e453ebb570672af6ebcd0478cac6/tumblr_inline_plss2yuzfK1tiiqk5_540.gif')

          await interaction.editReply({ embeds: [infoEmbed], ephemeral: true });
        } else if (interaction.values[0] === "role") {
          await interaction.deferUpdate();

          const modEmbed = new Discord.EmbedBuilder()
            .setTitle("Quầy Bán Role")
            .setDescription(`
           
<:chamhong:1125869563838472364> \`28\` <@&1124062125229346920> | \`15,000\`

<:chamhong:1125869563838472364> \`29\` <@&1125641678913548299> | \`30,000\`

<:chamhong:1125869563838472364> \`30\` <@&1125641802574209055> | \`50,000\`

<:chamhong:1125869563838472364> \`31\` <@&1125641989174595594> | \`100,000\`
            `)
            .setColor("Random")
            .setImage('https://i.pinimg.com/originals/04/9c/0c/049c0cbf9ed52f024086ff32dd8603e1.gif')

          await interaction.editReply({ embeds: [modEmbed], ephemeral: true });
        } else if (interaction.values[0] === "chest") {
          await interaction.deferUpdate();

          const modEmbed = new Discord.EmbedBuilder()
            .setTitle("Quầy Bán Rương")
            .setDescription(`
            
<:chamvang:1125863859740225556> \`32\` <:ruongbac:1135643679256756374> Rương Bạc | \`10,000\`

<:chamvang:1125863859740225556> \`33\` <:ruongvang:1135643685476896789> Rương Vàng | \`20,000\`

<:chamvang:1125863859740225556> \`34\` <:rngkimcuong:1135643691814494278> Rương Đặc Biệt | \`30,000\`
            `)
            .setColor("Random");
          await interaction.editReply({ embeds: [modEmbed], ephemeral: true });
        } else if (interaction.values[0] === "flower") {
          await interaction.deferUpdate();

          const modEmbed = new Discord.EmbedBuilder()
            .setTitle("Quầy Bán Hoa")
            .setDescription(`

<:chamxanh:1124058113742479400> \`20\` <a:p_flower22:1135636392374960310> Bông Hoa | \`1,000\`

<:chamxanh:1124058113742479400> \`21\` <:bbng:1124017699614371890> Bó Bông | \`2,000\`

<:chamxanh:1124058113742479400> \`22\` <:ko:1124018356949884928> Cục Kẹo | \`3,000\`

<:chamxanh:1124058113742479400> \`23\` <:socola:1124018847511478372> Socola | \`5,000\`

<:chamxanh:1124058113742479400> \`24\` <:gubng:1124018585275211867> Gấu Bông | \`10,000\`
            `)
            .setColor(0x0099ff)
            .setImage('https://i0.wp.com/boingboing.net/wp-content/uploads/2015/07/tumblr_noa6mdd3yb1qze3hdo1_500.gif?resize=500%2C288')
          await interaction.editReply({ embeds: [modEmbed], ephemeral: true });
        }
      }
    }
  },
};
