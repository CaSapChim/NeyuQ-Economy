const fs = require("fs");

var weather = [
  
]

function date(time) {
    time.hour++;
    if (time.hour === 23) {
      time.day++;
      time.hour = 0;
    }
    if (time.day === 31) {
      time.day = 1;
      time.month++;
    }
    if (time.month === 12) {
      time.year++;
      time.month = 1;
    }
  }

  

const doTime = function() {
    const duration = 600000; //vl quen 10p = 1 hour ._.
    setInterval(() => {
      fs.readFile("./data/time.json", "utf-8", (err, data) => {
        if (err) console.log(err);
        let timeObj = JSON.parse(data);
        date(timeObj);
        let json = JSON.stringify(timeObj);
        fs.writeFile("./data/time.json", json, "utf-8", function () {});
      });
    }, duration);
  }
module.exports = { doTime } 