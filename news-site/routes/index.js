var express = require('express');
const { isLoggedIn, isNotLoggedIn, verifyToken } = require('./middlewares');

var router = express.Router();

// 홈페이지
// 로그인상태가 아니면 homepage.pug를 render하고, 로그인상태면 loginedhome.pug를 출력합니다.
router.get('/', verifyToken, (req, res, next) => {
  console.log(req.user, 'ddddddddddddddddddddddddddd')
  if (req.isAuthenticated()) return next();
  res.render('homepage');
}, (req, res, next) => {
  res.render('loginedhome', { user: req.user });
});

// 로그인페이지
router.get('/loginPage', isNotLoggedIn, function (req, res, next) {
  res.render('login');
});

// 회원가입페이지
router.get('/signUp', isNotLoggedIn, function (req, res, next) {
  res.render('signup');
});

module.exports = router;
