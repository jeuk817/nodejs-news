const jwt = require('jsonwebtoken');

// req.isAuthenticated()는 로그인상태면 true를 return합니다.

// 로그인상태면 다음 미들웨어로 넘깁니다.
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(403).send('로그인 필요');
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

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token, 'ttttttttttttttttttttttttt')
        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'not logged in'
            })
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken, 'decodeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
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