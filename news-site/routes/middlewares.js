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
                req.flash('Inaccessible', '접근권한이 없습니다.');
                return res.redirect('/loginPage')
                // return res.render('homePage', { user: req.user });
            }
            console.log('token login success')
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
            return next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                req.flash('Inaccessible', '로그인 시간이 초과되었습니다.');
                return res.redirect('/loginPage')
                // return res.render('homePage');
                // return res.status(419).json({
                //     code: 419,
                //     message: '토큰이 만료되었습니다.'
                // });
            }
            req.flash('Inaccessible', '유효하지 않은 로그인입니다.');
            return res.redirect('/loginPage');
            // return res.status(401).json({
            //     code: 401,
            //     message: '유효하지 않은 토큰입니다.'
            // });
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
            req.flash('Inaccessible', '이미 로그인하셨습니다.');
            return res.redirect('/');
            // return res.render('homePage', { user: req.user });
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                // 토큰 유효기간이 지난 상태일 때
                return next();
            }
            req.flash('Inaccessible', '유효하지 않은 토큰입니다.');
            return res.redirect('/');
            // return res.status(401).json({
            //     code: 401,
            //     message: '유효하지 않은 토큰입니다.'
            // });
        }
    } else {
        // session 로그인 상태일 때
        req.flash('Inaccessible', '이미 로그인하셨습니다.');
        return res.redirect('/');
        // return res.render('homePage', { user: req.user });
    }
}

exports.loginConfig = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next();
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next();
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.'
        });
    }
}
