const express = require('express');
const bodyParser = require('body-parser');

const Videos = require('../../database/videos');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get('/', async (req, res)=>{
  const result = await Videos.getAll();
  return res.send(result);
});


module.exports = router;