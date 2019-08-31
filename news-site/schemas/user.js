// 몽구스 스키마를 만들어 model을 export합니다.
const mongoose = require('mongoose');
const { Schema } = mongoose;


const user = new Schema({
    id: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    pwd: String,
    picture: String,
    provider: {
        type: String,
        default: 'local',
    },
    record: {
        comments: [{
            article_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'articles' },
            index: [Number],

        }],
        good: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
        sad: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
        angry: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
        want: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
    },
})

module.exports = mongoose.model('user', user, 'Users');
