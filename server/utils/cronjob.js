const cron = require("node-cron");
const colors = require("colors");
const moment = require("moment");

const {
  addNewChannel,
  initVideosDatabase,
  initChannelDatabase,
  updateVtuberDatabase,
  updateVideosDatabase,
  checkVideosDatabase,
  getYoutubeCount,
  getSpecialVideoDocs,
  delSpecialVideoDocs,
} = require("./youtube.js");

const initCronJob = async () => {
  // return;
  console.log("Strat Update".green);
  const now = moment().format("YYYY/MM/DD HH:mm:ss");
  try {
    // await delSpecialVideoDocs(),
    // await getSpecialVideoDocs();
    await addNewChannel();
    // await initChannelDatabase();
    await updateVtuberDatabase();
    // await initVideosDatabase();
// <<<<<<< HEAD
    await checkVideosDatabase();
    // await updateVideosDatabase();
    // console.log(now, 'updateVideosDatabase OK'.green)
    // await checkVideosDatabase();
    // console.log(now, 'checkVideosDatabase OK'.green)
    // console.log(now, 'init OK'.green)
// =======
    // await checkVideosDatabase();
    await updateVideosDatabase();
    console.log(1);
    await checkVideosDatabase();
    console.log(now, "init OK".green);
// >>>>>>> f490140ebc53f7d5cf9905527e7f5b80967e2c9b
  } catch (err) {
    console.log(now.red, err.message);
  }

  console.log("cron start".green);
  let isUpdateing = false;
  cron.schedule("*/10 * * * *", async () => {
    if (isUpdateing) return;
    isUpdateing = true;
    const now = moment().format("YYYY/MM/DD HH:mm:ss");
    try {
      await updateVideosDatabase();
      console.log(now, "updateVideosDatabase OK".green);
      await checkVideosDatabase();
      console.log(now, "checkVideosDatabase OK".green);
    } catch (err) {
      console.log(now.red, err.message);
    }
    console.log(now.green, getYoutubeCount());
    isUpdateing = false;
  });
  cron.schedule("0 * * * *", async () => {
    const now = moment().format("YYYY/MM/DD HH:mm:ss");
    try {
      await updateVtuberDatabase();
      console.log(now, "CronHour OK".green);
    } catch (err) {
      console.log(now.red, err.message);
    }
    console.log(now.blue, getYoutubeCount());
  });
};

module.exports = initCronJob;
