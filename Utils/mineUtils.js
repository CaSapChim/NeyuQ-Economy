function mine() {

  const resources = [];

  for (let i = 0; i < 1; i++) {
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

  return resources;
}

module.exports = {
  mine
}