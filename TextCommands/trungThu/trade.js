const Discord = require('discord.js');

module.exports = {
    name: 'trade',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message // nqg trade @user <id> <số lượng> <money>
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const author = message.author.id;
        let mention = message.mentions.users.first();
        let itemId = args[1];
        let soLuong = parseInt(args[2]);
        let money = parseInt(args[3]);

        if (!soLuong || soLuong < 0 || !money) {
            return message.reply('Sai cú pháp.\nCách dùng: `nqg trade @user <id> <số lượng> <tiền>`');
        }
        if (mention.id == author) return message.reply('Bạn không thể tự giao dịch với chính mình!');
        if (money < 1000) return message.reply(`Số tiền trade tối thiểu là 1000 <:O_o:1135831601205481523> coins`)

        const arr = ['lua', 'dau', 'bi', '200', '201', '202', '203', '204', '205', '206', '207', '208', '208', '209', '210'];
        const checkItem = {
            'lua': 'lúa',
            'dau': 'đậu',
            'bi': 'bí',
            '200': 'sữa',
            '201': 'trứng',
            '202': 'bột mì',
            '203': 'bột bánh đậu xanh',
            '204': 'bột bánh thập cẩm',
            '205': 'nhân đậu xanh',
            '206': 'nhân thập cẩm',
            '207': 'bánh trung thu nhân đậu xanh',
            '208': 'bánh trung thu nhân thập cẩm',
            '209': 'lạp xưởng',
            '210': 'bơ',
        }

        let phiTrade = 1000;
        let balance = await client.xemTien(mention.id); // Xem tiền người đc trade
        
        if (balance < money) return message.reply(`<@${mention.id}> không đủ tiền để tiếp tục cuộc giao dịch này!`);
        
        let logChannel = client.channels.cache.get('1157540591320711178');
        if (arr.includes(itemId)) {

            const tradeEmbed = new Discord.EmbedBuilder()
                .setDescription(`Cuộc giao dịch giữa <@${author}> và <@${mention.id}>
                
                    > <@${author}> sẽ nhận được **${money - phiTrade} <:O_o:1135831601205481523> coins**

                    > <@${mention.id}> sẽ nhận được **${soLuong} ${checkItem[itemId]}** và mất **${money} <:O_o:1135831601205481523> coins**

                    > <@${mention.id}>, bạn có muốn thực hiện cuộc giao dịch này với <@${author}> không ?
                `)
                .setFooter({ text: "Bấm nút bên dưới để thực hiện cuộc giao dịch"})
                .setTimestamp()
                .setColor('White')

            const acceptButton = new Discord.ButtonBuilder()
                .setCustomId('accept')
                .setLabel('Chấp nhận')
                .setEmoji('<:tch:1136673192665161889>')
                .setStyle(Discord.ButtonStyle.Success);
    
            const declineButton = new Discord.ButtonBuilder()
                .setCustomId('decline')
                .setLabel('Từ chối')
                .setEmoji('<:kotich:1136674388717076581>')
                .setStyle(Discord.ButtonStyle.Danger);
    
            const row = new Discord.ActionRowBuilder()
                .addComponents(acceptButton, declineButton);
    
            const dongYEmbed = new Discord.EmbedBuilder()
                .setDescription(`
                    **<@${author}> và <@${mention.id}> vừa thực hiện thành công cuộc giao dịch!**
                `)
                .setColor('Green')
                .setThumbnail('https://gifdb.com/images/high/handshake-making-a-deal-hcx268nm9llx57gt.gif')
                .setTimestamp()
    
            const tuChoiEmbed = new Discord.EmbedBuilder()
                .setDescription(`<${mention.id}> đã từ chối cuộc giao dịch!`)
                .setColor('Red')
                .setTimestamp()  

            const logEmbed = new Discord.EmbedBuilder()
                .setColor('Green')
                .setTitle('LỊCH SỬ GIAO DỊCH')
                .setDescription(`
                <@${author}> đã giao dịch thành công với <@${mention.id}>
                
                > <@${author}> **+${money - phiTrade} <:O_o:1135831601205481523> coins**

                > <@${mention.id}> **+${soLuong} ${checkItem[itemId]}**

                > <@${mention.id}> **-${money} <:O_o:1135831601205481523> coins**
                `)
                .setTimestamp()
                .setFooter({ text: 'Lệ phí mỗi lần giao dịch: 1000 nqg coins'})

            const a = await message.channel.send({ embeds: [tradeEmbed], components: [row] });

            var collector = a.createMessageComponentCollector({
                filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
            })
    
            collector.on('collect', async (button) => {
                if (button.user.id === mention.id) {
                    if (button.customId === 'accept') {
                        button.deferUpdate()
                        a.edit({ embeds: [dongYEmbed], components: []})
                        trade(author, mention.id, checkItem[itemId], soLuong, money);
                        //await logChannel.send({ embeds: [embed] });
                
                    } else if (button.customId === 'decline') {
                        button.deferUpdate()
                        a.edit({ embeds: [tuChoiEmbed], components: []})
                    }
                } else {
                    return button.reply({ content: 'Này. nút này không phải dành cho bạn', ephemeral: true})
                }
            });
        } else {
            message.reply('Không tìm thấy id vật phẩm');
        }

        async function trade(author, toGiveUser, itemId, soLuong, money) {
            await client.addNongSan(toGiveUser, itemId, soLuong); // add item cho người đc trade
            await client.truNongSan(author, itemId, soLuong); // trừ item người trade
            await client.truTien(toGiveUser, money); // trừ tiền người đc trade
            await client.addTien(author, money - phiTrade); // add tiền cho người trade
        }
    }
}