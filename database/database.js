import mongoose from "mongoose";

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    return connection;
  } catch (error) {
    console.log(error);
  }
};
mongoose.connection.on('connected', () => {
  console.log("Mongodb connected!")
});
mongoose.connection.on('error', () => {
  console.log("Mongodb connected error!")
});
mongoose.connection.on('disconnected', () => {
  console.log("Mongodb connected is disconnect!")
});
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default connect