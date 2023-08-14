async function mine(client, message) {
  const buffMineModel = require('../database/models/buffMineModel')

  const resources = [];
  const buffs = await buffMineModel.find({
    userId: message.author.id
  })

  for ( let b in buffs ) {
    let buf = buffs[b]
    let soLuongBuff = buf.soLuongBuff
    let type = buf.type
    if (soLuongBuff > 0 && type == 1) {
      await client.truBuffMine(message.author.id, 1, 1)
      for (let i = 0; i < 3; i++) {
        let randomValue1 = Math.floor(Math.random() * 10000);
        let randomValue2 = Math.floor(Math.random() * 10000);
        let randomValue3 = randomValue1 + randomValue2
    
        if (randomValue3 <= 1000) {
          resources.push({ name: 'Ngọc lục bảo', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 2000 && randomValue3 <= 7000) {
          resources.push({ name: 'Sắt', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 16000 && randomValue3 <= 18000 ) {
          resources.push({ name: 'Vàng', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 1000 && randomValue3 <= 2000) {
          resources.push({ name: 'Kim cương', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 11000 && randomValue3 <= 16000) {
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else 
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 })
      }
    }
    else if (soLuongBuff > 0 && type === 2) {
      await client.truBuffMine(message.author.id, 1, 2)
      for (let i = 0; i < 6; i++) {
        let randomValue1 = Math.floor(Math.random() * 10000);
        let randomValue2 = Math.floor(Math.random() * 10000);
        let randomValue3 = randomValue1 + randomValue2
    
        if (randomValue3 <= 1000) {
          resources.push({ name: 'Ngọc lục bảo', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 2000 && randomValue3 <= 7000) {
          resources.push({ name: 'Sắt', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 16000 && randomValue3 <= 18000 ) {
          resources.push({ name: 'Vàng', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 1000 && randomValue3 <= 2000) {
          resources.push({ name: 'Kim cương', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 11000 && randomValue3 <= 16000) {
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else 
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 })
      }
    } else if (soLuongBuff > 0 && type == 3) {
      await client.truBuffMine(message.author.id, 1, 3)
      for (let i = 0; i < 9; i++) {
        let randomValue1 = Math.floor(Math.random() * 10000);
        let randomValue2 = Math.floor(Math.random() * 10000);
        let randomValue3 = randomValue1 + randomValue2
    
        if (randomValue3 <= 1000) {
          resources.push({ name: 'Ngọc lục bảo', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 2000 && randomValue3 <= 7000) {
          resources.push({ name: 'Sắt', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 16000 && randomValue3 <= 18000 ) {
          resources.push({ name: 'Vàng', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 1000 && randomValue3 <= 2000) {
          resources.push({ name: 'Kim cương', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 11000 && randomValue3 <= 16000) {
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else 
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 })
      }
    } else if (soLuongBuff > 0 && type == 4) {
      await client.truBuffMine(message.author.id, 1, 4)
      for (let i = 0; i < 12; i++) {

        let randomValue1 = Math.floor(Math.random() * 10000);
        let randomValue2 = Math.floor(Math.random() * 10000);
        let randomValue3 = randomValue1 + randomValue2
    
        if (randomValue3 <= 1000) {
          resources.push({ name: 'Ngọc lục bảo', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 2000 && randomValue3 <= 7000) {
          resources.push({ name: 'Sắt', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 16000 && randomValue3 <= 18000 ) {
          resources.push({ name: 'Vàng', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 1000 && randomValue3 <= 2000) {
          resources.push({ name: 'Kim cương', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 11000 && randomValue3 <= 16000) {
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else 
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 })
      }
    } else if (soLuongBuff > 0 && type == 5) {
      await client.truBuffMine(message.author.id, 1, 5)
      for (let i = 0; i < 15; i++) {
        let randomValue1 = Math.floor(Math.random() * 10000);
        let randomValue2 = Math.floor(Math.random() * 10000);
        let randomValue3 = randomValue1 + randomValue2
    
        if (randomValue3 <= 1000) {
          resources.push({ name: 'Ngọc lục bảo', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 2000 && randomValue3 <= 7000) {
          resources.push({ name: 'Sắt', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 16000 && randomValue3 <= 18000 ) {
          resources.push({ name: 'Vàng', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 1000 && randomValue3 <= 2000) {
          resources.push({ name: 'Kim cương', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else if (randomValue3 > 11000 && randomValue3 <= 16000) {
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 });
        } else 
          resources.push({ name: 'Than', soLuong: Math.floor(Math.random() * 1) + 1 })
      }
    } 
  }

  return resources;
}

module.exports = { mine }