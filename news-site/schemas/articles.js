// 몽구스 스키마를 만들어 model을 export합니다.
const mongoose = require('mongoose');
const { Schema } = mongoose;

// 기사 스키마 구성요소
// 기자_id, 기자이름, 제목, 사진, 내용, 댓글, 감정표현, 조회수, 작성일, 수정일
const article = new Schema({
    reporterId: {
        type: String,
        required: true,
    },
    reporterName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    pictureUrl: String,
    content: {
        type: String,
        required: true,
    },
    comments: [],
    emotions: {
        good: {
            type: Number,
            default: 0,
        },
        sad: {
            type: Number,
            default: 0,
        },
        angry: {
            type: Number,
            default: 0,
        },
        want: {
            type: Number,
            default: 0,
        },
    },
    hits: {
        type: Number,
        default: 0,
    },
}, {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        }
    })

module.exports = mongoose.model('article', article, 'articles');
