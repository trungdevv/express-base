import { User } from "../models/index.js";
import bcrypt from "bcrypt";
const login = async (req, res) => {
  console.log("ok hahs");
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
    // console.log("🚀 ~ file: user.js:13 ~ register ~ hashPassword:", hashPassword)
    const newUser = await User.create({ email, password: hashPassword });
    return {
      ...newUser._doc,
      password: "Not show"
    };
  } catch (error) {
    console.log(error.message);
  }
};
export default { login, register };
