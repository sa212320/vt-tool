const express = require('express');

const router = express.Router();

router.use('/vtuber', require('./vtuber'));
router.use('/videos', require('./videos'));
router.use('/user', require('./user'))

module.exports = router;