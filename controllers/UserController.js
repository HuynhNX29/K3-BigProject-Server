import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { JWT } from "../ultils/getJsonWebToken.js";
//LOGIN
const loginController = async (req, res) => {
  try {
    const body = req.body;
    // console.log(body);
    const { name, password } = body;

    if (!password || !name) {
      throw new Error("Missing name or password");
    }

    const existingUser = await UserModel.findOne({ name });

    if (!existingUser) {
      res.status(401);
      throw new Error("User not found");
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatchPassword) {
      res.status(402);

      throw new Error("Password is not match");
    }

    res.status(200).json({
      message: "Login successfully!",
      data: {
        name,
        email: existingUser.email,
        _id: existingUser._id,
        accesstoken: JWT.GetJWT({ id: existingUser._id, name }),
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    // throw new Error(error);
    // console.log(error);
  }
  // res.send("");
};

//REGISTER
const registerController = async (req, res) => {
  const body = req.body;
  const { name, email, password } = body;

  try {
    // console.log(body);

    // console.log(req.body);

    if (!name || !password || !email) {
      throw new Error("Missing anything");
    }

    const existingUser = await UserModel.findOne({ name });
    if (existingUser) {
      throw new Error("User is already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hash,
    });
    await newUser.save();

    const accesstoken = JWT.GetJWT({ id: newUser._id, name });
    res.status(201).json({
      message: "Created successfully!",
      data: {
        _id: newUser._id,
        name,
        accesstoken,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }

  // res.send("the deo nao");
};
export { loginController, registerController };
