import Joi from "joi";
import { userRepository } from "../repositories/index.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
// Login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(16).required(),
});

const login = async (req, res) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return res.send(error.status);
  }
  const { email, password } = req.body;
  try {
   let user =  await userRepository.login({ email, password });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(16).required(),
});
const register = async (req, res) => {
  const { email, password, phoneNumber, address } = req.body;
  try {
    const user = await userRepository.register({
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(200).json({ message: "Register OK", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // let newUser = await userRepository.login({ email, password });
};
export default { login, register: register };
