const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: 'ap-northeast-2',
})

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'news-site-circus',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'News-picture' });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname + '_' + Date.now().toString())
        }
    }),
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024,
    },
})

module.exports = upload;
