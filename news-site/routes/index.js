var express = require('express');
<<<<<<< HEAD
const { isLoggedIn, isNotLoggedIn, verifyToken } = require('./middlewares');
=======
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
>>>>>>> Circus 뉴스사이트 로컬로그인 구현 (#27)

var router = express.Router();

// 홈페이지
// 로그인상태가 아니면 homepage.pug를 render하고, 로그인상태면 loginedhome.pug를 출력합니다.
<<<<<<< HEAD
router.get('/', isLoggedIn, (req, res, next) => {
  console.log(req.user)
  // console.log(req.userInfo)
=======
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.render('homepage');
}, (req, res, next) => {
>>>>>>> Circus 뉴스사이트 로컬로그인 구현 (#27)
  res.render('loginedhome', { user: req.user });
});

// 로그인페이지
router.get('/loginPage', isNotLoggedIn, function (req, res, next) {
<<<<<<< HEAD
  res.render('login', { note: req.flash('note') });
=======
  res.render('login');
>>>>>>> Circus 뉴스사이트 로컬로그인 구현 (#27)
});

// 회원가입페이지
router.get('/signUp', isNotLoggedIn, function (req, res, next) {
  res.render('signup');
});

module.exports = router;
