const multer = require("multer");
const path = require("path")

const imageStorage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  module.exports.imageUpload = multer({
    storage:imageStorage

    

  })
