
const express = require('express');

const initServer = (app) =>{
  const handle = app.getRequestHandler();
  app.prepare()
  .then(() => {
    const server = express()
    server.use('/api', require('../api'));

    server.get('*', (req, res) => {
      return handle(req, res)
    })
    const port = process.env.PORT||3000
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    db.close();
    process.exit(1);
  })
}

module.exports = initServer;
