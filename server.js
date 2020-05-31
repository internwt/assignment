(async () => {
  const db = require('./database/database-config');
  const { initDB } = require('./database/initDB.js');
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 3000;
  const router = require('./router/router');


  try {
    await initDB();
    await db.authenticate()
    console.log(`connection has been established successfully`);

  } catch (e) {
    console.log(e);

  }

  app.use('/api', router);

  //create all tables
  await db.sync();

  app.listen(port, () => {
    console.log(`app now running on: localhost:${port}`);
  })
})();