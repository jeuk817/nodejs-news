const mongoose = require('mongoose');

// app.js에서 실행됩니다.
// 몽구스를 이용해 몽고DB와 연결하는 함수
module.exports = () => {
    mongoose.connect('mongodb://localhost', {
<<<<<<< HEAD
        dbName: 'newsSite',
=======
        dbName: 'test',
>>>>>>> Circus 뉴스사이트 로컬로그인 구현 (#27)
        useNewUrlParser: true
    })

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log('DB가 열렸습니다.');
    });
}
