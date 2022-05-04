const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
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

const fileUploadMiddleware = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

module.exports = fileUploadMiddleware;