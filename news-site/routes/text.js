const express = require('express');
const path = require('path');
const multer = require('multer');
// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb) {
//             cb(null, 'imgFile/');
//         },
//         filename(req, file, cb) {
//             const ext = path.extname(file.originalname);
//             cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
//         },
//     }),
//     limits: {
//         fieldSize: 5 * 1024 * 1024
//     },
// })
// const upload = multer({})

const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const UserCollection = require('../schemas/user');
const upload = require('../services/file-upload');
const singleUpload = upload.single('image')


router.get('/', isLoggedIn, (req, res, next) => {
    res.render('text', { user: req.user });
});

// router.post('/write', isLoggedIn, upload.single('avatar'), (req, res, next) => {
//     // res.render('text', { user: req.user });
//     console.log('req.file.buffer', req.file.buffer)
//     console.log(req.file, 'file')

// });

// router.post('/write', isLoggedIn, upload.single('avatar'), (req, res, next) => {
//     // res.render('text', { user: req.user });
//     console.log('req.file.buffer', req.file.buffer)
//     console.log(req.file, 'file')
// });

router.post('/write', isLoggedIn, (req, res, next) => {
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] })
        }

        return res.json({ 'imgUrl': req.file.location });
    })
});

module.exports = router;
