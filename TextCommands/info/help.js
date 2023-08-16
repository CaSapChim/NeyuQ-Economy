const {
    EmbedBuilder,
    ActionRowBuilder,
    Client,
    Message,
    StringSelectMenuBuilder,
  } = require ("discord.js");

  module.exports = {
    name: "help",
    description: "Xem danh sách các lệnh của bot",
    cooldown: 10,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {*} args
     * @returns
     */
    run: async (client, message, args, userData) => {
      const type = args[0]
      if (type == 'gift') {
        const hoaEmbed = new EmbedBuilder()
          .setColor('LuminousVividPink')
          .setTitle('Điểm thân mật của từng loại quà')
          .setDescription(`
            > **Điểm này sẽ cộng vào level marry khi tặng quà**

            **Bông hoa:** \`+10 điểm\`

            **Bó bông:** \`+30 điểm\`

            **Cục kẹo:** \`+50 điểm\` 

            **Socola:** \`+80 điểm\`

            **Gấu bông:** \`+100 điểm\`

            **=> Bạn có thể sở hữu các loại quà này ở \`shop hoa\`**
          `)
          .setTimestamp()
          .setFooter({ text: 'Chúc bạn thật nhiều sức khỏe'})
          message.reply({ embeds: [hoaEmbed] })
          return
      }

      if (type == 'ca') {
        const caEmbed = new EmbedBuilder()
        .setColor('Aqua')
        .setTitle('Điểm nhận được của từng loại cá')
        .setDescription(`
          > **Điểm này sẽ cộng vào điểm cá của bạn khi bắt được cá**

          Mỗi loài cá sẽ xuất hiện vào những khung giờ khác nhau: <#1140994771331076257>

          **Very common:** \`+20 điểm\` <a:Minecraft_Fish7:1141240605800939650>

          **Common:** \`+30 điểm\` <a:Minecraft_Fish7:1141240605800939650>

          **Uncommon:** \`+40 điểm\` <a:Minecraft_Fish7:1141240605800939650>

          **Rare:** \`+50 điểm\` <a:Minecraft_Fish7:1141240605800939650>

          **Very Rare:** \`+70 điểm\` <a:Minecraft_Fish7:1141240605800939650>

          **Legendary:** \`+200 điểm\` <a:Minecraft_Fish7:1141240605800939650>

          **Lưu ý: Loài cá Lengendary chỉ bắt được bằng \`Lưới vip\`**
        `)
        .setTimestamp()
        .setFooter({ text: 'Chúc bạn thật nhiều sức khỏe'})
        message.reply({ embeds: [caEmbed] })
        return
      }

      let helpMenu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("help_menu")
          .setPlaceholder("Help Menu")
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions([
             {
              label: "Economy",
              description: "Xem các lệnh về tiền bạc",
              value: "economy",
              emoji: "<:tiu:1135830334664085554>",
            }, 
            {
              label: "Game",
              description: "Xem các lệnh về game",
              value: "game",
              emoji: "<:player55:1140617255349141606>",
            }, 
            {
              label: "Friends",
              description: "Xem các lệnh về bạn bè",
              value: "friends",
              emoji: "<:banbe2:1122443390580166676>",
            },
            {
              label: "inventory",
              description: "Xem các lệnh về túi đồ",
              value: "inv",
              emoji: "<:rare_crate:1138836624139096204>",
            },
            {
              label: "Marry",
              description: "Xem các lệnh về marry",
              value: "marry",
              emoji: "<a:bearkisembar:1125365849688117363>",
            },
            {
                label: "Shop",
                description: 'Xem các lệnh về shop',
                value: 'shop',
                emoji: '<:market_car:1138837141925929061>'
            },
            {
                label: "Others",
                description: 'Các lệnh khác',
                value: 'other',
                emoji: '<:agregar:1138912143446659082>'
            }
           
          ])
      );
  
      let helpEmbed = new EmbedBuilder()
        .setTitle('BẢNG HELP LỆNH')
        .setDescription(`
            **Prefix hiện tại:** : \`nqg\`

            <:tiu:1135830334664085554> **Economy:** \`4 lệnh\`

            <:player55:1140617255349141606> **Game:** \`2 lệnh\`

            <:banbe2:1122443390580166676> **Friends:** \`3 lệnh\`

            <:rare_crate:1138836624139096204> **Inventory:** \`3 lệnh\`

            <a:bearkisembar:1125365849688117363> **Marry:** \`5 lệnh\`

            <:market_car:1138837141925929061> **Shop:** \`3 lệnh\`

            <:agregar:1138912143446659082> **Others:** \`5 lệnh\`

            **Chú thích:** <> = bắt buộc, [] = tùy chọn
        `)
        .setColor("Green")

     const a = await message.channel
        .send({ embeds: [helpEmbed], components: [helpMenu] })
        
        client.on("interactionCreate", async interaction => {
            
            if (!interaction.isStringSelectMenu()) return;
            if (interaction.user.id !== message.author.id) return
            if (interaction.customId === "help_menu") {
        await interaction.deferUpdate()
                if (interaction.values[0] === "economy") {
        
        
        
                    const infoEmbed = new EmbedBuilder()
                .setTitle("Các lệnh về economy")
                .setDescription(
                  "`balance`, `daily`, `give`, `work`"
                )
                .addFields(
                  { name: '**Cách dùng:** `nqg balance`', value: 'Xem túi tiền của mình. Rút gọn: `bal`, `cash`', inline: false },
                  { name: '**Cách dùng:** `nqg daily`', value: 'Nhận tiền hàng ngày. Rút gọn: `Không có`', inline: false },
                  { name: '**Cách dùng:** `nqg give <người dùng>`', value: 'Chuyển tiền cho người khác. Rút gọn: `send`', inline: false },
                  { name: '**Cách dùng:** `nqg work`', value: 'Làm việc kiếm tiền. Rút gọn: `w`', inline: false },
        
                )
                .setColor("Random");
        
                await a.edit({ embeds: [infoEmbed]})
        
                } else if (interaction.values[0] === 'game') {
                  const gameEmbed = new EmbedBuilder()
                    .setTitle("Các lệnh về bạn bè")
                    .setDescription(
                      "`fish`, `mine`"
                    )
                    .addFields(
                      { name: '**Cách dùng:** `nqg mine`', value: 'Đào khoáng sản. Các bạn có thể bán các khoáng sản mình bằng `**nqg sell than|sat|vang|kc|nlb <số lượng>**`', inline: false },
                      { name: '**Cách dùng:** `nqg fish`', value: 'Câu cá. Mỗi loại cá có nhiều độ hiếm khác nhau và giá tiền nhận được cũng tương ứng với độ hiếm. ', inline: false },
                    )
                    .setColor("Random");
        
                    await a.edit({ embeds: [gameEmbed]})
                }
                else if (interaction.values[0] === "friends") {
        
                    const modEmbed = new EmbedBuilder()
                    .setTitle("Các lệnh về bạn bè")
                    .setDescription(
                      "`listfriend`, `ketban`, `xoaban`"
                    )
                    .addFields(
                      { name: '**Cách dùng:** `nqg listfriend`', value: 'Xem danh sách bạn bè của mình. Rút gọn: `banbe`, `rela`, `ketbancheck`', inline: false },
                      { name: '**Cách dùng:** `nqg ketban + <người dùng>`', value: 'kết bạn với một người.', inline: false },
                      { name: '**Cách dùng:** `nqg xoaban + <người dùng>`', value: 'Xóa bạn ra khỏi danh sách.', inline: false },
                    )
                    .setColor("Random");
        
                    await a.edit({ embeds: [modEmbed]})
        
                } else if (interaction.values[0] === "inv") {
        
                
        
                    const utilityEmbed = new EmbedBuilder()
                .setTitle("Các lệnh về Inventory")
                .setDescription(
                  "`inventory`, `mayman`, `use`"
                )
                .addFields(
                  { name: '**Cách dùng:** `nqg inventory`', value: 'Xem túi đồ của mình. Rút gọn: `inv`', inline: false },
                  { name: '**Cách dùng:** `nqg mayman`', value: 'Xem số rương và điểm may mắn của mình. Rút gọn: `Không có`', inline: false },
                  { name: '**Cách dùng:** `nqg use <id/tên>`', value: 'Dùng một vật phẩm trong túi đồ. Rút gọn: `Không có`', inline: false },
                )
                .setColor("Random");
        
                await a.edit({ embeds: [utilityEmbed]})
        
              } else if (interaction.values[0] === "marry") {
            
        
                const robloxEmbed = new EmbedBuilder()
                    .setTitle("Các lệnh về Marry")
                    .setDescription(
                         "`totinh`, `fa`, `hon`, `gift`, `lvmarry`"
                    )
                    .addFields(
                      { name: '**Cách dùng:** `nqg totinh + <người dùng>`', value: 'Tỏ tình và kết hôn với người ấy. Rút gọn: `marry`', inline: false },
                      { name: '**Cách dùng:** `nqg fa + <người dùng>`', value: 'Chia tay với người ấy :(. Rút gọn: `Không có`', inline: false },
                      { name: '**Cách dùng:** `nqg hon <người dùng>`', value: 'Hun người ấy, + 10đ lv. Rút gọn: `Không có`', inline: false },
                      { name: '**Cách dùng:** `nqg gift <người dùng>`', value: 'Tặng quà cho người ấy. Rút gọn: `Không có`', inline: false },
                      { name: '**Cách dùng:** `nqg lvmarry`', value: 'Xem điểm thân mật của chuyện tình mình. Rút gọn: `lv`', inline: false }
                    )
                    .setColor("Random");
        
                    await a.edit({ embeds: [robloxEmbed]})
        
              } else if (interaction.values[0] === "shop") {
            
        
                const funEmbed = new EmbedBuilder()
                    .setTitle("Các lệnh về Shop")
                    .setDescription(
                         "`shop`, `buy`, `sell`"
                    )
                    .addFields(
                      { name: '**Cách dùng:** `nqg shop`', value: 'Xem những món đồ đang bán trong shop.', inline: false },
                      { name: '**Cách dùng:** `nqg buy <ID> [số lượng]`', value: 'Buy một món đồ trong cửa hàng', inline: false },
                      { name: '**Cách dùng:** `nqg sell <ID>`', value: 'Sell một món đồ trong túi(Hiện tại chỉ có nhẫn)', inline: false},
                    )
                    .setColor("Random");
        
                    await a.edit({ embeds: [funEmbed]})
              } else if (interaction.values[0] === "other") {
            
        
                const funEmbed = new EmbedBuilder()
                    .setTitle("Các lệnh khác")
                    .setDescription(
                         "`top`, `help`,`time`, `prefix`, `ping`, `confession`"
                    )
                    .addFields(
                      { name: '**Cách dùng:** `nqg top <bal|marry>`', value: 'Xem top tiền hoặc marry.', inline: false },
                      { name: '**Cách dùng:** `nqg help`', value: 'Mở bảng hỗ trợ', inline: false },
                      { name: '**Cách dùng:** `nqg time`', value: 'Xem thời gian ảo hiện tại để bắt cá.', inline: false},
                      { name: '**Cách dùng:** `nqg prefix <prefix>`', value: 'Đổi prefix cho máy chủ.', inline: false},
                      { name: '**Cách dùng:** `nqg ping`', value: 'Xem độ trễ của bot. Rút gọn: `p`, `ms`', inline: false},
                      { name: '**Cách dùng:** `/confession`', value: 'Gửi confession.', inline: false},
                    )
                    .setColor("Random");
        
                    await a.edit({ embeds: [funEmbed]})
            }}
          })
      },
  };
  