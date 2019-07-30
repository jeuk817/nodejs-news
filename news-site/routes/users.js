var express = require('express');
var router = express.Router();
const DB = require('../schemas/index');
const db = new DB();
const testC = db.userCollection();
db.connect();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signUp', (req, res, next) => {
  const { id, pwd } = req.body;
  let test = new testC({ id, pwd });
  test.save((err, account) => {
    if (err) return console.error(err);
  })
  res.redirect('/login');
})

router.post('/identification', async (req, res, next) => {
  const { id } = req.body;
  try {
    const users = await testC.find({ id });
    if (users.length) {
      res.send('no');
    } else {
      res.send('yes')
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
})

module.exports = router;
