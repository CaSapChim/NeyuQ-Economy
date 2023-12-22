const jobModel = require('../../database/models/userDataJob/jobModel');
const thongKeModel = require('../../database/models/userDataJob/thongKeModel');
const thuongThanhTuu = require('../../data/thuongThanhTuu.json');
const emoji = require('../../emoji.json');

module.exports = async (client) => {
    client.lvl =  (userId, type) => new Promise(async ful => {
        let data = await jobModel.findOne({ userId: userId });
        if (!data) return ful(0);
        else return ful(data[type].level);
    })

    client.exp = (userId, type) => new Promise(async ful => {
        let data = await jobModel.findOne({ userId: userId });
        if (!data) return ful(0);
        else return ful(data[type].exp);
    })

    client.thongThao = (userId, type) => new Promise(async ful => {
        let data = await jobModel.findOne({ userId: userId });
        if (!data) return ful(0);
        else return ful(data[type].thongThao);
    })

    client.limit = (userId, type) => new Promise(async ful => {
        let data = await jobModel.findOne({ userId: userId });
        if (!data) return ful(0);
        else return ful(data[type].limit);
    })

    client.addExp = async (userId, type, exp) => {
        try {
            let jobData = await jobModel.findOne({ userId: userId });
            if (!jobData)
                jobData = new jobModel({ userId: userId });
            jobData[type].exp += exp;
            while (jobData[type].exp >= jobData[type].limit) {
                jobData[type].exp -= jobData[type].limit;
                jobData[type].level += 1;
                jobData[type].limit = jobData[type].limit * 0.2 + jobData[type].limit;
            }
            await jobData.save();
        } catch(err) {
            console.log("Lỗi add exp:", err);
        }
    }

    client.thongKe = (userId, type) => new Promise(async ful => {
        let data = await thongKeModel.findOne({ userId: userId });
        if (!data) return ful(0);
        else return ful(data[type]);
    })

    client.addThongKe = async (userId, name) => {
        const nameObj = {
            "mine": "đào mỏ",
            "cauca": "câu cá",
            "farm": "trồng cây"
        }

        try {
            let data = await thongKeModel.findOne({ userId: userId });
            data[name] += 1;
            data.save();
            // const thanhTuuArr = Object.keys(thuongThanhTuu[name] || {});
            // console.log(thanhTuuArr);
            // thanhTuuArr.map(async i => {
            //     if (i == data[name]) {
            //         await client.addToken(userId, thuongThanhTuu[name][i]);
            //         return `${emoji.congra} <@${userId}> đã ${nameObj[name]} được ${i} lần và được thưởng **${thuongThanhTuu[name][i]}** ${emoji.token} Tokens`;
            //     } else {
            //         return ` `;
            //     }
            // });
            
        } catch(err) {
            console.log("Lỗi addThanhTuu:", err);
        }
    }
}