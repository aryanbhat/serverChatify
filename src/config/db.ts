import mongoose from "mongoose";

export const conDb = async function () {
  const mongoUrl = process.env.MONGOURL;
  if (!mongoUrl) {
    throw new Error("MONGOURL enviornment is not available");
  }
  try {
    const connect = await mongoose.connect(mongoUrl, {});
    console.log(connect.connection.host);
  } catch (err) {
    console.log(err);
    return;
  }
};
