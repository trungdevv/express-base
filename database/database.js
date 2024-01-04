import mongoose from "mongoose";

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    return connection;
  } catch (error) {
    console.log(error);
  }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default connect