const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const UserCollection = require('../schemas/user');


router.get('/', function (req, res, next) {
    res.send('text');
});

module.exports = router;
