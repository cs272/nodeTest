var express = require('express');
var router = express.Router();

let auth = require('../middleware/authMiddleware')


router.use('/', require('./auth'));
router.use('/notes', auth, require('./notes'));


module.exports = router;
