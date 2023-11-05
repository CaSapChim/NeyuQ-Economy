async function mine(client, message) {
  const buffMineModel = require('../database/models/buffMineModel');

  const resources = [];
  const buffs = await buffMineModel.find({
    userId: message.author.id
  });

  const miningPromises = [];

  message.channel.send(`${message.author.username} đang đào...`).then(msg => {
    setTimeout(() => {
      msg.delete();
    }, 2000);
  });

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

          for (let i = 0; i < numIterations; i++) {
            let randomValue1 = Math.floor(Math.random() * 10000);
            let randomValue2 = Math.floor(Math.random() * 10000);
            let randomValue3 = randomValue1 + randomValue2;

            if (randomValue3 <= 1000) {
              minedResources.push({ name: 'Ngọc lục bảo', soLuong: Math.floor(Math.random() * 1) + 1 });
            } else if (randomValue3 > 2000 && randomValue3 <= 7000) {
              minedResources.push({ name: 'Sắt', soLuong: Math.floor(Math.random() * 1) + 1 });
            } else if (randomValue3 > 16000 && randomValue3 <= 18000) {
              minedResources.push({ name: 'Vàng', soLuong: Math.floor(Math.random() * 1) + 1 });
            } else if (randomValue3 > 1000 && randomValue3 <= 2000) {
              minedResources.push({ name: 'Kim cương', soLuong: Math.floor(Math.random() * 1) + 1 });
            } else if (randomValue3 > 11000 && randomValue3 <= 16000) {
              minedResources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 });
            } else {
              minedResources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 });
            }
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