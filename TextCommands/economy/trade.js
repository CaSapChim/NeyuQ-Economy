const Discord = require('discord.js');
const checkIdAndName = require('../../data/idAndNameProducts.json');
const emoji = require('../../emoji.json');

module.exports = {
    name: 'trade',
    adminOnly: false,
    description: "Trao đổi, buôn bán vật phẩm với người khác",
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
            return message.reply('Sai cú pháp.\nCách dùng: `nqg trade @user <id vật phẩm> <số lượng> <tiền>`');
        }
        if (mention.id == author) return message.reply(`${emoji.fail} Bạn không thể tự giao dịch với chính mình!`);
        if (money < 1000) return message.reply(`Số tiền trade tối thiểu là 1000 <:O_o:1135831601205481523> coins`)

        const sanPhamArr = ["300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312"];
        const nongSanArr = ["250", "251", "252", "253", "254", "255", "256", "257", "258"];
        const caArr = ["240", "241", "242", "243", "244", "245"];


        let phiTrade = 1000;
        let balance = await client.xemTien(mention.id); // Xem tiền người đc trade

        let logChannel = client.channels.cache.get('1157540591320711178');
        if (sanPhamArr.includes(itemId) || nongSanArr.includes(itemId) || caArr.includes(itemId)) {

            const tradeEmbed = new Discord.EmbedBuilder()
                .setDescription(`Cuộc giao dịch giữa <@${author}> và <@${mention.id}>

                <a:Glitch_warn:1166628298374266971> **Lưu ý: Vui lòng đọc kĩ thông tin giao dịch trước khi bấm nút xác nhận để tránh bị scam <:socam:1188124042679570432>**
                
                    > <@${author}> sẽ nhận được **${money - phiTrade} <:O_o:1135831601205481523> coins**

                    > <@${mention.id}> sẽ nhận được **${soLuong} ${checkIdAndName.name[itemId]}** và mất **${money} <:O_o:1135831601205481523> coins**

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
                <@${author}> đã giao dịch thành công với <@${mention.id}>
                
                > <@${author}> **+${money - phiTrade} <:O_o:1135831601205481523> coins**

                > <@${mention.id}> **+${soLuong} ${checkIdAndName.name[itemId]} ${checkIdAndName.emoji[itemId]}**

                > <@${mention.id}> **-${money} <:O_o:1135831601205481523> coins**
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
                
                > <@${author}> **+${money - phiTrade} <:O_o:1135831601205481523> coins (đã trừ phí giao dịch)**

                > <@${mention.id}> **+${soLuong} ${checkIdAndName.name[itemId]} ${checkIdAndName.emoji[itemId]}**

                > <@${mention.id}> **-${money} <:O_o:1135831601205481523> coins**
                `)
                .setTimestamp() 

            const a = await message.channel.send({ embeds: [tradeEmbed], components: [row] });

            var collector = a.createMessageComponentCollector({
                filter: interaction => (interaction.isButton() || interaction.isSelectMenu()) && interaction.message.author.id == client.user.id,
            })
    
            collector.on('collect', async (button) => {
                if (button.user.id === mention.id) {
                    if (button.customId === 'accept') {
                        if (balance < money) return message.reply(`<@${mention.id}> không đủ tiền để tiếp tục cuộc giao dịch này!`);
                        button.deferUpdate()
                        a.edit({ embeds: [dongYEmbed], components: []})
                        trade(author, mention.id, checkIdAndName.name[itemId], soLuong, money);
                        await logChannel.send({ embeds: [logEmbed] });
                
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

        const trade = async (author, toGiveUser, itemName, soLuong, money) => {
            if (caArr.includes(itemId)) {
                await client.addCa(toGiveUser, itemName, soLuong);
                await client.truCa(author, itemName, soLuong);
            } else if (sanPhamArr.includes(itemId)) {
                await client.addSanPham(toGiveUser, itemName, soLuong);
                await client.truSanPham(author, itemName, soLuong);
            } else {
                await client.addNongSan(toGiveUser, itemName, soLuong);
                await client.truNongSan(author, itemName, soLuong);
            }
            await client.truTien(toGiveUser, money); // trừ tiền cho người bị trade
            await client.addTien(author, money - phiTrade); // add tiền cho người trade
        }
    }
}