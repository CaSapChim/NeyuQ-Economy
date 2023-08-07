const Discord = require('discord.js');
const { Captcha } = require('../../Utils/captchaUtils')

module.exports = {
  name: 'work',
  aliases: ['w', 'lamviec'],
  cooldown: 15,

  run: async (client, message, args) => {
    await Captcha(client, message)

    const jobs = [
      { name: 'quét rác', minCoins: 30, maxCoins: 50, chance: 65 },
      { name: 'bán vé số', minCoins: 30, maxCoins: 50, chance: 65 },
      { name: 'phục vụ', minCoins: 50, maxCoins: 100, chance: 35 },
      { name: 'marketing', minCoins: 100, maxCoins: 150, chance: 25 },
      { name: 'xây dựng', minCoins: 150, maxCoins: 250, chance: 15 },
      { name: 'viết code', minCoins: 300, maxCoins: 400, chance: 10 },
      { name: 'bác sĩ', minCoins: 400, maxCoins: 500, chance: 5 },
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