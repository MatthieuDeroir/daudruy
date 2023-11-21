const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/build/media/'))
  },
  filename: function (req, file, cb) {
    cb(null, req.body.fileName + "." + req.body.format)
  }
})

const upload = multer({ storage: storage });

module.exports = upload;
