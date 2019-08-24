const express = require('express');

const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const articleCollection = require('../schemas/articles');
const upload = require('../services/file-upload');
const singleUpload = upload.single('image')


router.get('/', isLoggedIn, (req, res, next) => {
    res.render('text', { user: req.user });
});

// 글쓰기 저장 시 실행합니다.
router.post('/write', isLoggedIn, (req, res, next) => {
    // 첨부파일을 s3 에 저장하는 함수입니다.
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] })
        }

        console.log('user', req.user)
        return res.json({ 'imgUrl': req.file.location });
    })
});

module.exports = router;
