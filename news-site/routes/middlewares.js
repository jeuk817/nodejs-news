const jwt = require('jsonwebtoken');

// req.isAuthenticated()는 로그인상태면 true를 return합니다.

// 로그인상태면 다음 미들웨어로 넘깁니다.
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.render('homepage');
    }
};

// 로그아웃상태가 아니면 다음 미들웨어로 넘깁니다.
// 로그인상태면 홈으로 redirect합니다.
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

// jwt토큰을 통해 로그인 되었는지 확인하는 함수.
// 쿠키에 토큰이 저장되어있는지 확인후 없으면 홈페이지로, 있으면 req.userInfo에 담아서 next를 한다.
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.render('homepage');
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.userInfo = decodedToken;
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.'
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.'
        });
    }
}