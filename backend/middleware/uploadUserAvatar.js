const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/img/users');
    },
    filename(req, file, cb) {
        cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
    }
})

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);  

    if(extname && mimetype) {
        return cb(null, true);
    } else {
        return cb('Images only');
    }
}

const uploadUserAvatar = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

module.exports = uploadUserAvatar;