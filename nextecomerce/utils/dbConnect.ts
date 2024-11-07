import mongoose from "mongoose";
const dbConnect = async () => {
  debugger;
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connect(process.env.DB_URI);
};
export default dbConnect;
