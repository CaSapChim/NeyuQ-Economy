const Discord = require('discord.js');
const { Captcha } = require('../../Utils/captchaUtils')
const verifiedModel = require('../../database/models/verifiedModel')

module.exports = {
  name: 'work',
  aliases: ['w', 'lamviec'],
  cooldown: 5,
  adminOnly: false,

  run: async (client, message, args) => {
    let verifyData = await verifiedModel.findOne({ userId: message.author.id })
    if (verifyData) return message.reply('**Vui lòng nhập captcha để tiếp tục sử dung bot**')
    
    await Captcha(client, message)

    const jobs = [
      { name: 'quét rác', minCoins: 500, maxCoins: 1000, chance: 90 },
      { name: 'bán vé số', minCoins: 500, maxCoins: 1000, chance: 80 },
      { name: 'phục vụ', minCoins: 600, maxCoins: 1300, chance: 80 },
      { name: 'marketing', minCoins: 600, maxCoins: 2000, chance: 10 },
      { name: 'xây dựng', minCoins: 1000, maxCoins: 2500, chance: 5 },
      { name: 'viết code', minCoins: 1500, maxCoins: 5000, chance: 5 },
      { name: 'bác sĩ', minCoins: 2000, maxCoins: 7000, chance: 2 },
    ];

    const job = getRandomJob();
    const earnCoins = calculateEarnCoins(job);

    const msg = `**${message.author.username}**, bạn đã được thuê làm công việc **${job}** và nhận được **${earnCoins} <:O_o:1135831601205481523> coins**`;
    message.channel.send(msg);
    await client.addTien(message.author.id, earnCoins);

    function getRandomJob() {
      const tongTiLe = jobs.reduce((tong, job) => tong + job.chance, 0);
      const rand = Math.floor(Math.random() * tongTiLe);
      let a = 0;
      for (const job of jobs) {
        a += job.chance;
        if (rand < a) {
          return job.name;
        }
      }
    }

    function calculateEarnCoins(jobName) {
      const selectedJob = jobs.find((job) => job.name === jobName);
      if (selectedJob) {
        return Math.floor(Math.random() * (selectedJob.maxCoins - selectedJob.minCoins + 1)) + selectedJob.minCoins;
      }
    }
  },
};