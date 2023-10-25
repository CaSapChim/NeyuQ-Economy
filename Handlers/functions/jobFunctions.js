const userModel = require('../../database/models/userDataJob/userModel');

module.exports = (client) => {
    client.checkJob = async (userId) => new Promise(async ful => {
      let userData = await userModel.findOne({ userId: userId });
      if (userData) {
        return ful(userData.job.jobType);
      } else return ful(0);
    })
  
    client.addJob = async (userId, jobName) => {
        try {
            let userData = await userModel.findOne({ userId: userId });
            userData.job.jobType = `${jobName}`;
            await userData.save();
        } catch(err) {
            console.log("Lỗi addJob: ", err);
        }
    }

    client.checkJobLevel = async (userId) => new Promise(async ful => {
      let userData = await userModel.findOne({ userId: userId });
      if (userData) {
        return ful(userData.job.levelJob);
      } 
    })

    client.addJobExp = async (userId, exp) => {
        try {
          let userData = await userModel.findOne({ userId: userId });
          userData.job.currentExpJob += exp;
            while (userData.job.currentExpJob >= userData.job.maxExpJob) {
              userData.job.currentExpJob -= userData.job.maxExpJob;
              userData.job.maxExpJob = userData.job.maxExpJob + Math.round(Math.random() * 100);
              userData.job.levelJob++;
            }

            await userData.save();
        } catch(err) {
            console.log("Lỗi checkExpJob: ", err);  
        }
    }
}