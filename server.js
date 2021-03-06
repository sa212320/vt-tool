require('dotenv').config();
const next = require('next');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './client' });
// const initCronJob = require('./server/utils/cronjob');
const initServer = require('./server/utils/server');
const Channel = require('./server/database/channel');
const Vtuber = require('./server/database/vtuber');
const Videos = require('./server/database/videos');
const db = require('./server/utils/db');
const colors = require('colors');

const initDb = async () => {
  try {
    console.log('Connect DB ing'.green);
    await db.authenticate();
    console.log('Connect DB'.green);
    await db.sync({alter: false});
    console.log('Sync Successfully'.green);
  } catch (err) {
    console.log(err);
    throw new Error('Unable to Connect Db');
  }
};


initDb().then(()=>{
  // initCronJob();
  initServer(app);
});

