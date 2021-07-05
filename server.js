require('dotenv').config();
// dependencies externs
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// dependencies interns
const connectDB = require('./config/db');
// app
const app = express();

// middlewares
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}))

// routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRouter'));
app.use('/api', require('./routes/paymentRouter'));

// connect data
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server in on port ${PORT}`))