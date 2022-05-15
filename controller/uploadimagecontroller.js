const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, image, cb) => {
        cb(null, "../ui/kalisu/public/images")
    },
    filename: (req, image, cb) => {
        cb(null, Date.now() + '-' + image.originalname)
    }
});

const upload = multer({ storage });

module.exports = upload;