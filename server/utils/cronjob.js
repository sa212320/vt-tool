const cron = require('node-cron');
const colors = require('colors');
const moment =  require('moment');

const { 
  initVideosDatabase,
  initChannelDatabase,
  updateVtuberDatabase,
  updateVideosDatabase,
  checkVideosDatabase,
} =  require('./youtube.js');

const initCronJob = async()=>{
  console.log('Strat Update'.green)
  const now = moment().format('YYYY/MM/DD HH:mm:ss');
  try {
    await initChannelDatabase();
    console.log(now, 'initChannelDatabase OK'.green)
    await updateVtuberDatabase();
    console.log(now,'updateVtuberDatabase OK'.green)
    await initVideosDatabase();
    console.log(now,'initVideosDatabase OK'.green)
    await checkVideosDatabase();
    console.log(now,'checkVideosDatabase OK'.green)
  } catch (err) {
    console.log(now.red, err.message);
  }

  cron.schedule('*/2 * * * *', async () => {
    try {
      const now = moment().format('YYYY/MM/DD HH:mm:ss');
      await updateVtuberDatabase();
      console.log(now,'Cron updateVtuberDatabase OK'.green)
      await updateVideosDatabase();
      console.log(now,'Cron updateVideosDatabase OK'.green)
      await checkVideosDatabase();
      console.log(now,'Cron checkVideosDatabase OK'.green)
    } catch (err) {
      console.log(now.red, err.message);
    }
  });
};

module.exports = initCronJob;
