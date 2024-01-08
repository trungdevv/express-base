import { User } from "../models/index.js";
import bcrypt from "bcrypt";
const login = async ({ email, password }) => {
  let existingUser = await User.findOne({ email: email }).exec();
  console.log("🚀 ~ file: user.js:5 ~ login ~ existingUser:", existingUser);
  if (existingUser) {
    let isMatch = await bcrypt.compare(password, existingUser.password);

    if (!!isMatch) {
      //create java token
    } else {
      throw new Error("Wrong email and password");
    }
  } else {
    throw new Error("Wrong email and password");
  }
};
const register = async ({ email, password, phoneNumber, address }) => {
  try {
    let existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Error("Exist User");
    }
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
   
    const newUser = await User.create({ email, password: hashPassword });
    return {
      ...newUser._doc,
      password: "Not show",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
export default { login, register };
