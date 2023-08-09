const Discord = require("discord.js");

/**
 * @param {Discord.Message} message
 */
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

    
  },
};
