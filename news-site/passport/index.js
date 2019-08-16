const local = require('./localStrategy');
<<<<<<< HEAD
const google = require('./googleStrategy');
=======
>>>>>>> Circus 뉴스사이트 로컬로그인 구현 (#27)
const UserCollection = require('../schemas/user');

module.exports = (passport) => {
    // Passport는 req객체에 login과 logout 메서드를 추가합니다.
    // req.login이 passport.serializeUser를 호출합니다. req.login에서 로그인한 사용자정보 user객체가 넘어옵니다.
    // done함수의 두 번째 인자로 넘긴 user.id가 세션에 저장됩니다.
    passport.serializeUser((user, done) => {
<<<<<<< HEAD
        console.log('serializeUser')
        // done(null, '1234');
=======
>>>>>>> Circus 뉴스사이트 로컬로그인 구현 (#27)
        done(null, user.id);
    });

    // passport.deserializeUser 메서드는 app.js에서 passport.session()미들웨어가 매 요청시 호출합니다.
    // serializeUser가 세션에 저장했던 id를 받아 db를 조회하여 유저정보를 req.user에 저장합니다.
    passport.deserializeUser((id, done) => {
<<<<<<< HEAD
        console.log('deserializeUser')
=======
>>>>>>> Circus 뉴스사이트 로컬로그인 구현 (#27)
        UserCollection.findOne({ id })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    // 이 메소드는 클라이언트로부터 로그인입력값을 받아와 로그인 전략을 구현합니다.
    local(passport);
<<<<<<< HEAD
    google(passport);
=======
>>>>>>> Circus 뉴스사이트 로컬로그인 구현 (#27)
}
