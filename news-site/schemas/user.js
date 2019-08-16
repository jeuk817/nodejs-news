// 몽구스 스키마를 만들어 model을 export합니다.
const mongoose = require('mongoose');
const { Schema } = mongoose;

<<<<<<< HEAD
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
    }
})

module.exports = mongoose.model('user', user, 'Users');
=======
const testSchema = new Schema({
    id: String,
    pwd: String,
})

module.exports = mongoose.model('test', testSchema);
>>>>>>> Circus 뉴스사이트 로컬로그인 구현 (#27)
