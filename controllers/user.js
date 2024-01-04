import Joi from "joi";
import { userRepository } from "../repositories/index.js";

// Login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(16).required(),
});

const login = async (req, res) => {
  const {value, error} = loginSchema.validate;
  if(error){
    return res.send(error.status)
  }
  const { email, password } = req.body;
  await userRepository.login({ email, password });
  res.status(200).json({ message: "Login OK" });
};

// Register

const register = async (req, res) => {
  const { email, password, phoneNumber, address } = req.body;
  await userRepository.registor({ email, password, phoneNumber, address });
  res.status(200).json({ message: "Register OK" });
};
export default { login, register: register };
