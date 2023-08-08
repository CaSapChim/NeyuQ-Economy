const { EmbedBuilder, ChatInputCommandInteraction, Client, ApplicationCommandOptionType } = require("discord.js");
const cfsModel = require('../../database/models/cfsModel')

module.exports = {
    name: 'confession',
    description: 'Viết Confession Mà Bạn Muốn',
    options: [
        {
            name: 'noidung',
            description: 'Nội dung confession',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'andanh',
            description: 'Viết ẩn danh hay hiển thị tên?',
            type: ApplicationCommandOptionType.Boolean,
            required: true,
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    run: async (client, interaction) => {
        let countCfsData = await cfsModel.findOne()
        
        // Kiểm tra xem người dùng có sử dụng lệnh ở kênh cho phép hay không
        const allowedChannelId = '1080521432032882700';
        if (interaction.channelId !== allowedChannelId) {
            return interaction.reply({ content: 'Bạn không thể sử dụng lệnh này ở đây!', ephemeral: true });
        }
        
        // Kiểm tra xem confession có đủ 50 từ hay không
        const query = interaction.options.getString('noidung');
        if (query.split(' ').length < 1) {
            return interaction.reply({ content: 'Confession phải có ít nhất 50 từ!', ephemeral: true });
        }
        
        interaction.reply({ content: 'Đã đăng confession thành công!', ephemeral: true });
        
        let count = 0

        if (countCfsData) {
            countCfsData.count++
            count = countCfsData.count
            await countCfsData.save()
        } else {    
            const newCfsData = new cfsModel()
            await newCfsData.save()
        }   

        const logChannel = client.channels.cache.get('1129314138259202079');
        if (logChannel) {
            // Tạo thông báo nhúng mới
            const logEmbed = new EmbedBuilder()
                .setTitle(`Confession \`#${count}\``)
                .setDescription(`${query}`)
                .setColor('Random')
                .setTimestamp()
            
            // Kiểm tra xem người dùng có muốn viết ẩn danh hay không
            const anonymous = interaction.options.getBoolean('andanh');
            if (anonymous) {
                logEmbed.setAuthor({ name: `Người dùng ẩn danh`});
            } else {
                logEmbed.setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`});
            }
            
            // Gửi thông báo nhúng và các nút tương tác vào kênh log
            const logMessage = await logChannel.send({ embeds: [logEmbed] });
            
            // Tạo thread mới từ tin nhắn log
            await logMessage.startThread({
                name: `Trả Lời Confession`,
                autoArchiveDuration: 1440,
                reason: 'Cho phép người dùng trả lời confession'
            });
        }
    },
}
