const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './client/build/');
  },
  filename(req, file, cb) {
    cb (null, new Date().toISOString() + '-' + file.originalname)
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg']

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true)
    } else {
      cb (null, false)
    }
  }

const upload = multer({ storage });

module.exports = upload;
