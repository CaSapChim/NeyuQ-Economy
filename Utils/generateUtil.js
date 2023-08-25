async function generate (client, message, object) {
    const xoSoUserModel = require( '../database/models/xoSoUserModel');
    const xoSoModel = require('../database/models/xoSoModel');
    const { EmbedBuilder } = require('discord.js')

    class xoSoKienThiet {
          
          constructor(cacSoTrungThuong = [], soGiaiTrungTatca = 0) {
               this.cacSoTrungThuong = cacSoTrungThuong;
               this.soGiaiTrungTatca = soGiaiTrungTatca;
          }
          getCacSoTrungThuong() {
               return this.cacSoTrungThuong.map((num, index) => `**${index == 0 ? `Giải Đặc Biệt` : index == 1 ? `Giải Nhất` : index == 2 ? 'Giải Nhì' : index == 3 ? 'Giải Ba' : 'Giải Khuyến khích'  } :** \`${num}\`` )
                    .join('\n') 
          }
          getSoGiaiTrungTatca() {
               return `Có tất cả là \`${this.soGiaiTrungTatca}\` giải trúng `
          }
          
    } 
    let xoSoObject = new xoSoKienThiet();
    
    let xoSoData = await xoSoModel.findOne(); 
    if (!xoSoData) return message.channel.send("Khong ai mua ve' so' dau ma doi` xem giai? :3")
        
    xoSoData.giaiDB = Math.floor(Math.random() * (1e6 - 1e5)) + 1e5;
    xoSoData.giaiNhat = Math.floor(Math.random() * (1e5 - 1e4) + 1e4); 
    xoSoData.giaiNhi = Math.floor(Math.random() * (1e4 - 1e3) + 1e3);
    xoSoData.giaiBa = Math.floor(Math.random() * (1e3 - 1e2) + 1e2);
    xoSoData.giaiKK = Math.floor(Math.random() * (1e2 - 1e1) + 1e1);
    await xoSoData.save() 
    
    xoSoObject.cacSoTrungThuong.push(xoSoData.giaiDB); 
    xoSoObject.cacSoTrungThuong.push(xoSoData.giaiNhat); 
    xoSoObject.cacSoTrungThuong.push(xoSoData.giaiNhi); 
    xoSoObject.cacSoTrungThuong.push(xoSoData.giaiBa);
    xoSoObject.cacSoTrungThuong.push(xoSoData.giaiKK); 
    
    const cacSoTrungThuongEmbed = new EmbedBuilder()
        .setTitle('CÁC SỐ TRÚNG THƯỞNG')
        .setDescription(`${xoSoObject.getCacSoTrungThuong()} \n ${xoSoObject.getSoGiaiTrungTatca()}`)
        .setColor('Gold')
        .setTimestamp()
    await message.channel.send({ embeds: [cacSoTrungThuongEmbed] })

    let UserIdArray = xoSoData.userId;
    for (const userId of UserIdArray) {
         let userData = await xoSoUserModel.findOne({ userId: userId });
         if (!userData) continue;
         const xosoArray = userData.soLuong;
         const trungGiaiDb = xosoArray.filter((value) => value == xoSoData.giaiDB);
         const trungGiaiNhat = xosoArray.filter(value => value.slice(-5) == xoSoData.giaiNhat);
         const trungGiaiNhi = xosoArray.filter(value => value.slice(-4) == xoSoData.giaiNhi);
         const trungGiaiBa = xosoArray.filter(value => value.slice(-3) == xoSoData.giaiBa);
         const trungGiaiKK = xosoArray.filter(value => value.slice(-2) == xoSoData.giaiKK);
        
         if (trungGiaiDb.length > 0) {
            await message.channel.send(`Chúc mừng <@${userId}> đã trúng \`${trungGiaiDb.length}\` **giải đặc biệt**`);
          } 
         if (trungGiaiNhat.length > 0) {
            await message.channel.send(`Chúc mừng <@${userId}> đã trúng \`${trungGiaiNhat.length}\` **giải nhất**`)   
          } 
          if (trungGiaiNhi.length > 0) {
            await message.channel.send(`Chúc mừng <@${userId}> đã trúng \`${trungGiaiNhi.length}\` **giải Nhì**`)
          } 
          if (trungGiaiBa.length > 0) {
            await message.channel.send(`Chúc mừng <@${userId}> đã trúng \`${trungGiaiBa.length}\` **giải Ba**`)
          } 
          if (trungGiaiKK.length > 0) {
            await message.channel.send(`Chúc mừng <@${userId}> đã trúng \`${trungGiaiKK.length}\` **giải khuyến khích**`)
          }
          xoSoObject.soGiaiTrungTatca += trungGiaiDb.length + trungGiaiNhat.length + trungGiaiBa.length + trungGiaiKK.length;
         await userData.deleteOne();
    }

     await xoSoData.deleteOne();
     return xoSoObject;
}

module.exports = { generate }