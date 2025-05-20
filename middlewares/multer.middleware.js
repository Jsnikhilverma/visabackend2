const multer = require("multer");
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// })
  


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
      const ext = path.extname(file.originalname); 
      const fileName = randomImageName() + ext;
      const fullPath = path.join(uploadDir, fileName);
      cb(null, fileName);
  }
});

const upload = multer({ 
  storage:storage 
})
module.exports = upload;

