import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
const login = async ({ email, password }) => {
  let existingUser = await User.findOne({ email: email }).exec();
  if (existingUser) {
    let isMatch = await bcrypt.compare(password, existingUser.password);

    if (!!isMatch) {
      //create java token
      let token = jwt.sign({ data: existingUser }, process.env.JWT_SECRET, {
        expiresIn: "30m",
      });
      return {
        ...existingUser.toObject(),
        password: "Now show",
        token: token,
      };
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
const generated = async () => {
  let fakeUsers = [];
  for (let i = 0; i < 1000; i++) {
    // let existingUser = await User.findOne({ email }).exec();
    // if (!!existingUser) {
    //   throw new Error("Exist User");
    // }
    // const hashPassword = await bcrypt.hash(
    //   password,
    //   parseInt(process.env.SALT_ROUNDS)
    // );
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName,
      lastName,
    });

    let fakeUser = {
      sex: sex,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: faker.internet.password(),
    };
    fakeUsers.push({ email: fakeUser.email, password: fakeUser.password });
  }
  await User.insertMany(fakeUsers);
  return {
    password: "Generated success",
  };
};
const getUsers = async ({ page, size, searchString }) => {
  try {
    let filteredUsers = await User.aggregate([
      { $match: !!searchString ? { email: { searchString } } : {} },
      { $skip: (parseInt(page) - 1) * parseInt(size) },
      { $limit: parseInt(size) },
    ]);
    return filteredUsers;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUser = async ({ id }) => {
  try {
    let user = await User.findById(id).exec();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteUser = async ({ id }) => {
  try {
    let user = await User.findByIdAndDelete(id).exec();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default { login, register, generated,deleteUser, getUser, getUsers };
