const jwt = require('jsonwebtoken');

// req.isAuthenticated()는 로그인상태면 true를 return합니다.

// 로그인상태면 다음 미들웨어로 넘깁니다.
// 1. session을 이용한 로그인확인 2. 토큰을 이용한 로그인 확인 3. 둘다 아니면 next()로 다음 미들웨어로 넘깁니다.
exports.isLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('session login')
        return next();
    } else {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.render('homepage');
            }
            console.log('token login success')
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
            return next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.render('homepage');
                // return res.status(419).json({
                //     code: 419,
                //     message: '토큰이 만료되었습니다.'
                // });
            }
            return res.status(401).json({
                code: 401,
                message: '유효하지 않은 토큰입니다.'
            });
        }
    }
};

// 로그아웃상태면 다음 미들웨어로 넘깁니다.
// 1. session 로그아웃상태인지 확인 2. 토큰로그아웃상태인지 확인 3. session,token 둘다 로그아웃 상태라면 next()를 하여 다음미들웨어로 넘깁니다.
exports.isNotLoggedIn = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        try {
            const token = req.cookies.token;

            if (!token) {
                // session, token 둘다 로그아웃 상태일 때
                return next();
            }
            // token 로그인 상태일 때
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
            return res.render('loginedhome', { user: req.user });
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                // 토큰 유효기간이 지난 상태일 때
                return next();
            }
            return res.status(401).json({
                code: 401,
                message: '유효하지 않은 토큰입니다.'
            });
        }
    } else {
        // session 로그인 상태일 때
        return res.render('loginedhome', { user: req.user });
    }
}
