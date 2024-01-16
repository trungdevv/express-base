import Joi from "joi";
import { userRepository } from "../repositories/index.js";
import { MAX_RECORD } from "../constants/index.js";
// Login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(16).required(),
});

const getUsers = async (req, res) => {
  try {
    let { page = 1, size = MAX_RECORD, searchString = "" } = req.query;
    size = size <= MAX_RECORD ? size : MAX_RECORD;
    let users = await userRepository.getUsers({ page, size, searchString });
    res.status(200).json({ message: "Get Users", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return res.send(error.status);
  }
  const { email, password } = req.body;
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(200).json({ message: "Login successful", data: existingUser });
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
};
const generated = async (req, res) => {
  try {
    const result = await userRepository.generated();
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userRepository.deleteUser({ id });
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await userRepository.getUser({ id });
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default { login, register, generated, deleteUser, getUser, getUsers };
