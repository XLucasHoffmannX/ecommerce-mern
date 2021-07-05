const mongoose = require('mongoose');

const URI = process.env.MONGOCONNECT;

const connectDB = () => {
  try {
    mongoose.connect(URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }, err =>{
      if(err) return err;
      console.log('Conectado ao cluster!')
    })
  } catch (error) { console.log(error) }
};
module.exports = connectDB;