const cron = require('node-cron');
const colors = require('colors');
const moment =  require('moment');

const { 
  initVideosDatabase,
  initChannelDatabase,
  updateVtuberDatabase,
  updateVideosDatabase,
  checkVideosDatabase,
  getYoutubeCount,
} =  require('./youtube.js');

const initCronJob = async()=>{
  console.log('Strat Update'.green)
  const now = moment().format('YYYY/MM/DD HH:mm:ss');
  try {
    await initChannelDatabase();
    await updateVtuberDatabase();
    await initVideosDatabase();
    await checkVideosDatabase();
    console.log(now, 'init OK'.green)
  } catch (err) {
    console.log(now.red, err.message);
  }
  console.log(now.blue,  getYoutubeCount());
  cron.schedule('*/2 * * * *', async () => {
    try {
      const now = moment().format('YYYY/MM/DD HH:mm:ss');
      await updateVideosDatabase();
      await checkVideosDatabase();
      console.log(now, 'CronMin OK'.green)
    } catch (err) {
      console.log(now.red, err.message);
    }
    console.log(now.green,  getYoutubeCount());
  });
  cron.schedule('0 * * * *', async () => {
    try {
      const now = moment().format('YYYY/MM/DD HH:mm:ss');
      await updateVtuberDatabase();
      console.log(now, 'CronHour OK'.green)
    } catch (err) {
      console.log(now.red, err.message);
    }
    console.log(now.blue,  getYoutubeCount());
  });
};

module.exports = initCronJob;
