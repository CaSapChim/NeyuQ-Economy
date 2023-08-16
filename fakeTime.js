const timeModel = require('./database/models/timeModel')
 

const doTime = async function() {
    const duration = 10000; //vl quen 10p = 1 hour ._.
    let data = await timeModel.findOne()

    if (!data) {
      data = new timeModel({
        hour: 0,
        day: 1,
        month: 1,
        year: 0
      })
    }

    data.hour++;
    if (data.hour === 23) {
      data.day++;
      data.hour = 0;
    }
    if (data.day === 31) {
      data.day = 1;
      data.month++;
    }
    if (data.month === 12) {
      data.year++;
      data.month = 1;
    }
    setInterval(async () => {
        await timeModel.findOneAndUpdate({}, data)
    }, duration);
  }
module.exports = { doTime } 