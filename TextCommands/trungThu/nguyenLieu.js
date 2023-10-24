const Discord = require('discord.js');

module.exports = {
    name: 'nl',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        let type = args[0];
        if (type === 'dauxanh') {
            const nguyenLieuDauXanhEmbed = new  Discord.EmbedBuilder()
            .setTitle('Bảng nguyên liệu làm bánh nhân đậu xanh')
            .setColor('Green')
            .setDescription(`
                1 <:LC_Wheat:1155701062670504037> => 1 <:6289_flour:1155701022891704360>
                16 <:6289_flour:1155701022891704360> + 5 <:butter:1157312769234845736> + 16 <:Minecraft_Egg:1156555165189550101> + 16 <:eje_minecraft_milk:1156555171493597204> => 1 bột bánh <:botxanhremovebgpreview:1156914386917671032>
                16 <:daunh_1:1156608655060381760> + 8 <:eje_minecraft_milk:1156555171493597204> => 1 nhân đậu xanh <:botxanh2removebgpreview:1156915468267946004>
                1 <:botxanh2removebgpreview:1156915468267946004> + 1 <:botxanhremovebgpreview:1156914386917671032> => 1 <:banhdauxanh_1:1156609030165377035>
            `)
            .setThumbnail('https://media.discordapp.net/attachments/1138141730928070736/1156607690714386432/banhdauxanh_1.png?ex=6515965a&is=651444da&hm=b1d118a6622ae5828cbcf0af8389369e4aa40619d4e7ed5c4e9505c6f6487650&=&width=625&height=625')
            .setTimestamp()
            .setFooter({ text: 'Gõ lệnh nqg doinl <id> <số lượng> để đổi nguyên liệu!'})
            message.reply({ embeds: [nguyenLieuDauXanhEmbed] });
        }

        if (type === 'thapcam') {
            const nguyenLieuThapCamEmbed = new  Discord.EmbedBuilder()
            .setTitle('Bảng nguyên liệu làm bánh nhân thập cẩm')
            .setColor('Green')
            .setDescription(`
                1 <:LC_Wheat:1155701062670504037> => 1 <:6289_flour:1155701022891704360>
                16 <:6289_flour:1155701022891704360> + 5 <:butter:1157312769234845736> + 16 <:Minecraft_Egg:1156555165189550101> + 16 <:eje_minecraft_milk:1156555171493597204> => 1 bột bánh <:botBanhThapCAm:1157113151251292230>
                8 <:mc_carved_pumpkin45:1155704587462922272> + 16 <:lapXuong:1157312775077494794> + 8 <:Minecraft_Egg:1156555165189550101> => 1 nhân thập cẩm <:botxanh2removebgpreview:1156915468267946004>
                1 <:botxanh2removebgpreview:1156915468267946004> + 1 <:botxanhremovebgpreview:1156914386917671032> => 1 <:banhtrungthu_1:1156609035794124870>
            `)
            .setThumbnail('https://media.discordapp.net/attachments/1138141730928070736/1156607714609340496/banhtrungthu_1.png?ex=6516e7df&is=6515965f&hm=4810eb52b545b01da1f77b8fe350e896344fb61369aadd86cd0229bc975e7800&=&width=625&height=625')
            .setTimestamp()
            .setFooter({ text: 'Gõ lệnh nqg doinl <id> <số lượng> để đổi nguyên liệu!'})
            message.reply({ embeds: [nguyenLieuThapCamEmbed ]})
        }
    }
}