const express = require('express');
const bodyParser = require('body-parser');

const Vtuber = require('../../database/vtuber');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get('/', async (req, res)=>{
  const result = await Vtuber.getAll();
  return res.send(result);
});


module.exports = router;