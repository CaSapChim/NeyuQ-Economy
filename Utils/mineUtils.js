const Probability = require('probability-node');
const random = require('random-number-csprng');

async function mine(client, message) {
  const buffMineModel = require('../database/models/buffMineModel');

  const resources = [];
  const buffs = await buffMineModel.find({
    userId: message.author.id
  });

  const miningPromises = [];

  for (let b in buffs) {
    let buf = buffs[b];
    let soLuongBuff = buf.soLuongBuff;
    let type = buf.type;

    if (soLuongBuff > 0) {
      miningPromises.push(
        (async () => {
          await client.truBuffMine(message.author.id, 1, type);
          const numIterations = type * 3;
          const minedResources = [];

          const probabilityDistribution = [
            { p: 50, f: async () => minedResources.push({ name: 'Than', soLuong: 1 }) },
            { p: 25, f: async () => minedResources.push({ name: 'Sắt', soLuong: 1 }) },
            { p: 15, f: async () => minedResources.push({ name: 'Vàng', soLuong: 1 }) },
            { p: 5, f: async () => minedResources.push({ name: 'Kim cương', soLuong: 1 }) },
            { p: 2.5, f: async () => minedResources.push({ name: 'Ngọc lục bảo', soLuong: 1 }) },
            { p: 1.5, f: async () => minedResources.push({ name: 'titan', soLuong: 1 }) },
            { p: 0.85, f: async () => minedResources.push({ name: 'ametit', soLuong: 1 }) },
            { p: 0.1, f: async () => minedResources.push({ name: 'saphir', soLuong: 1 }) },
            { p: 0.05, f: async () => minedResources.push({ name: 'titan', soLuong: 1 }) },
          ];

          const probabilitilized = new Probability(...probabilityDistribution.map(entry => ({ p: `${entry.p}%`, f: entry.f })));

          for (let i = 0; i < numIterations; i++) {
            await probabilitilized();
          }

          resources.push(...minedResources);
        })()
      );
    }
  }

  await Promise.all(miningPromises);

  return resources;
}

module.exports = { mine };
