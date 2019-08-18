const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const UserCollection = require('../schemas/user');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 회원가입버튼 클릭시 실행
// 입력값 id,pwd를 받아와 DB에 저장합니다. 그후 로그인페이지로 redirect
router.post('/signUp', isNotLoggedIn, (req, res, next) => {
  const { id, pwd } = req.body;
  let newUser = new UserCollection({ id, pwd });
  newUser.save((err, account) => {
    if (err) return console.error(err);
  })
  res.redirect('/loginPage');
})

// ID중복확인버튼 클릭시 실행
// 입력값 id를 받아와 DB를 조회해 이미 있는 계정인지 확인하여 있으면 no 없으면 yes를 send합니다.
router.post('/identification', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.body;
  try {
    const users = await UserCollection.find({ id });
    if (users.length) {
      res.send('no');
    } else {
      res.send('yes')
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
})

// 로그인버튼 클릭 시 실행되는 함수
// app.js: passportConfig(passport) -> passport/index.js: local(passport) -> passport/localStrategy.js: passport.use -> 여기
// passport.use에서 로그인 성공/실패에 따라 다른 매개변수가 passport.authenticate의 두번째 콜백함수에 넘어옵니다.
// 로그인 성공시 req.login을 통해 passport를 쿠키에 저장하고, jwt.sign을 통해 토큰을 만들어 res.cookie를 통해저장한다.
// 실패시 로그인페이지에 redirect 성공시 홈으로 redirect
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    console.log('passport.authenticate')
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect('/loginPage');
    }
    req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const token = jwt.sign({
        id: user.id,
        _id: user._id
      }, process.env.JWT_SECRET, {
          expiresIn: '10m',
          issuer: 'circus'
        });
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 15 * 60000,
      })

      return res.redirect('/')
    });
  })(req, res, next);
});

// 로그아웃버튼 클릭시 실행
// req.logout은 req.user를 없애고, req.session.destroy는 req.session을 없앱니다. 그리고 홈페이지로 redirect합니다.
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.clearCookie('token', { path: '/' })
  res.clearCookie('connect.sid', { path: '/' })
  res.redirect('/');
});

// 구글 로그인 시 실행
// 유저의 프로파일을 가지고 passport/googleStrategy.js의 passport.use로 이동
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
  console.log('gogle redirect')
  res.redirect('/');
});

module.exports = router;
