const express = require('express');
const moongoose = require('mongoose');
const route = require('./routes/index.js');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const multer = require("multer");
const cors = require('cors');
const authRouter = require('./routes/authRouter');


// Load biến môi trường
require('dotenv').config({ path: './.env' });
const path = require('path');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;

// Kết nối views 
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
// Kết nối CSDL
const database_link = process.env.MONGODB_LINK;
console.log(database_link);

// Midleware
app.use(logger);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view cache', false);


moongoose
  .connect(database_link)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));



// Trang chủ để log in
app.get('/', (req, res) => {
    res.render('user/index'); 
  });

// Trang thay đổi thông tin cá nhân
app.get('/user/info', (req, res) => {
  res.render('user/user_info'); 
});

// Trang lich su in

app.get('/user/history', (req, res) => {
  res.render('user/print-history'); 
});

app.get('/user/buy-pages', (req, res) => {
  res.render('user/buy_pages'); 
});



// Trang admin
app.get('/dashboard', (req, res) => {
  res.render('admin/dashboard'); 
});
app.get('/admin/settings', (req, res) => {
  res.render('admin/admin_setup'); 
});

app.get('/admin/manage', (req, res) => {
  res.render('admin/admin_printer'); 
});






app.use('/', authRouter); 

app.use('/auth', authRouter);

route(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
