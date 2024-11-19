const express = require('express');
const moongoose = require('mongoose');
const route = require('./routes/index.js');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const multer = require("multer");
// Load biến môi trường
require('dotenv').config({ path: './.env' });
const path = require('path')
const app = express();
const PORT = process.env.PORT || 8080;
// Cấu hình multer để lưu file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });
// // Tạo thư mục uploads nếu chưa tồn tại
// const fs = require("fs");
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }
// Kết nối views 
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Kết nối CSDL
const database_link = process.env.MONGODB_LINK;
console.log(database_link);

// Midleware
app.use(logger);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

moongoose
  .connect(database_link)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

route(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
