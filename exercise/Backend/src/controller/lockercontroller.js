var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const bcrypt = require('bcrypt');

exports.login_locker = function () {
  return function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("coin-locker");
      var Username = req.body.Username
      dbo.collection("user-password").findOne({ Username }, function (err, result) {
        if (err) throw err;
        if (bcrypt.compareSync(req.body.PassWord, result.PassWord)) {
          req.result = result
        } else {
          res.status(400).json({ success: false, message: 'ชื่อผู้ใช้และรหัสผ่านไม่ตรงกัน' });

        }
        db.close();
        next();

      })
    })
  }
}
exports.story_locker = function () {
  return function (req, res, next) {
    var booking_locker = req.body.data
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("coin-locker");
      dbo.collection("MyCoinLoker").insertOne(booking_locker, function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
      next();
    })
  }
}








