const Discord = require("discord.js");
const emoji = require("../../emoji.json");
const userModel = require("../../database/models/userDataJob/userModel.js");
const sanPhamModel = require('../../database/models/userDataJob/sanPhamModel.js');
const thongKeModel = require('../../database/models/userDataJob/thongKeModel');
const profileModel = require('../../database/models/userDataJob/profileModel');
const jobModel = require('../../database/models/userDataJob/jobModel');
const premiumModel = require('../../database/models/userDataJob/premiumModel');

module.exports = {
    name: "dangky",
    description: "Đăng kí tài khoản để chơi các trò chơi của bot",
    run: async (client, message, args) => {
        let userData, sanphamData, thongKeData, profileData, jobData, premiumData; 
        try {

          userData = await userModel.findOne({ userId: message.author.id });
          sanphamData = await sanPhamModel.findOne({ userId: message.author.id });
          thongKeData = await thongKeModel.findOne({ userId: message.author.id });
          profileData = await profileModel.findOne({ userId: message.author.id });
          jobData = await jobModel.findOne({ userId: message.author.id });
          premiumData = await premiumModel.findOne({ userId: message.author.id });

          if (!userData && !sanphamData && !thongKeData && !profileData && !jobData && !premiumData) {
            const tosEmbed = new Discord.EmbedBuilder()
              .setColor("Red")
              .setTitle("**ĐIỀU KHOẢN SỬ DỤNG - BOT GAME VÀ HỆ THỐNG KINH TẾ**")
              .setDescription(`
              <a:NA_GeneralUpdates:1166628301817786408> Vui lòng đọc kỹ và hiểu rõ các điều khoản sau trước khi sử dụng bot của chúng tôi. Bằng cách sử dụng bot, bạn đồng ý tuân thủ tất cả các điều khoản dưới đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng bot.<a:NA_GeneralUpdates:1166628301817786408>
        
                      **1. Gian lận và phần mềm thứ 3: **
        
                      1.1. Chúng tôi không chấp nhận người dùng sử dụng phần mềm thứ 3 dưới mọi hình thức.
        
                      1.2. Phát hiện và lợi dụng bug của bot cho mục đích cá nhân sẽ bị BAN thẳng tay. 
                      
                      **2. Sự thay đổi và cập nhật: **
    
                      2.1 Hãy theo dõi kênh <#1118050184312664094> thường xuyên để biết thêm những cập nhật mới về bot.
                      
                      **Liên hệ:**
                      
                      <a:Glitch_warn:1166628298374266971> Nếu bạn có bất kỳ thắc mắc hoặc báo lỗi nào, vui lòng liên hệ <@874321270437728257> hoặc <@942356413546635264>.
                    `);
    
            const tosBtn = new Discord.ButtonBuilder()
              .setCustomId("accept")
              .setLabel("Chấp nhận điều khoản")
              .setStyle(Discord.ButtonStyle.Primary)
              .setEmoji("👍")
    
            const row = new Discord.ActionRowBuilder().addComponents(tosBtn);
    
            const a = await message.reply({
              content: "**## Bằng cách sử dụng bot, bạn xác nhận đã đọc, hiểu và chấp nhận tất cả các điều khoản sử dụng. Nếu bạn không đồng ý với các điều khoản này, vui lòng không sử dụng bot.**",
              embeds: [tosEmbed],
              components: [row],
            });
    
            var collector = a.createMessageComponentCollector({
              filter: (interaction) =>
                (interaction.isButton() || interaction.isSelectMenu()) &&
                interaction.message.author.id == client.user.id,
              time: 5 * 60000,
            });
    
            collector.on("collect", async (interaction) => {
              if (interaction.user.id !== message.author.id)
                return interaction.reply({
                  content: "Này, nút này không phải dành cho bạn!",
                  ephemeral: true,
                });
              if (interaction.customId === "accept") {
                interaction.deferUpdate();
    
                userData = new userModel({
                  userId: message.author.id,
                });
    
                sanphamData = new sanPhamModel({
                  userId: message.author.id
                })
    
                thongKeData = new thongKeModel({
                  userId: message.author.id
                })

                profileData = new profileModel({
                  userId: message.author.id
                })

                jobData = new jobModel({
                  userId: message.author.id
                })

                premiumData = new premiumModel({
                  userId: message.author.id
                })
    
                const embed = new Discord.EmbedBuilder()
                  .setColor('Green')
                  .setDescription(`
                  <:pink_reply:1166330261315801158> Cảm ơn <@${message.author.id}> đã đồng ý chấp hành luật 
                  <:pink_reply:1166330261315801158> Tặng bạn **10000 <:O_o:1135831601205481523> coins để khởi nghiệp**
                  `); 
    
                a.edit({ embeds: [embed], components: [], content: "" });
                await userData.save();
                await sanphamData.save();
                await thongKeData.save();
                await profileData.save();
                await jobData.save();
                await premiumData.save();
      
                await client.addTien(message.author.id, 10000);
              }
            });
    
            collector.on("end", async () => {
              await a.delete();
            });
            return;
        } 
        else {
            message.reply("Bạn đã được cấu hình tài khoản rồi.");
        }
        } catch (err) {
          console.log("Lỗi khi tạo db cho user:", err);
        }
    }
}