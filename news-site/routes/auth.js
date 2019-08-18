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

// 로컬로그인시 실행 라우터: DB에서 ID와 pwd를 체크하여 정확히 입력했다면 jwt를 생성하여 쿠키에 저장하고 홈페이지로 redirect합니다.
// 로그인 실패시 상황에 맞추어 메시지를 flash에 담아서 로그인페이지로 redirect합니다.(메시지는 로그인 버튼 아래 표시됩니다.)
router.post('/login', isNotLoggedIn, async (req, res, next) => {
  const { inputID, inputPwd } = req.body;
  try {
    const exUser = await UserCollection.findOne({ id: inputID });
    if (exUser) {
      const result = inputPwd === exUser.pwd;
      if (result) {
        // 로그인 성공시 토큰 생성
        const token = jwt.sign({
          id: exUser.id,
          _id: exUser._id,
          displayName: exUser.displayName,
        }, process.env.JWT_SECRET, {
            expiresIn: '10m',
            issuer: 'circus'
          });
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 15 * 60000,
        })

        return res.redirect('/')
      } else {
        req.flash('note', '비밀번호를 정확히 입력해 주세요.')
        return res.redirect('/loginPage');
      }
    } else {
      req.flash('note', 'ID를 정확히 입력해 주세요.')
      return res.redirect('/loginPage');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
})

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
