const mongoose = require("mongoose");

const conDb = async function (){
  try {
    const connect = await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    });
    console.log(connect.connection.host);
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = conDb;