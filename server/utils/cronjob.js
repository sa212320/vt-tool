const cron = require('node-cron');
const colors = require('colors');

const { 
  initVideosDatabase,
  initChannelDatabase,
  updateVtuberDatabase,
  updateVideosDatabase,
  checkVideosDatabase,
} =  require('./youtube.js');

const initCronJob = async()=>{
  // return;
  console.log('Strat Update'.green)
  await initChannelDatabase();
  console.log('initChannelDatabase OK'.green)
  await updateVtuberDatabase();
  console.log('updateVtuberDatabase OK'.green)
  await initVideosDatabase();
  console.log('initVideosDatabase OK'.green)
  await checkVideosDatabase();
  console.log('checkVideosDatabase OK'.green)
  cron.schedule('*/15 * * * *', async () => {
    await updateVtuberDatabase();
    console.log('Cron updateVtuberDatabase OK'.green)
    await updateVideosDatabase();
    console.log('Cron updateVideosDatabase OK'.green)
    await checkVideosDatabase();
    console.log('Cron checkVideosDatabase OK'.green)
  });
};

module.exports = initCronJob;
