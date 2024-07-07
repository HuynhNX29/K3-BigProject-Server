import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      throw new Error("Missing email or password");
    }

    const user = await UserModel.findOne({ email, password });

    if (!user) {
      res.status(404).send("User not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
  //   res.send("");
};

//REGISTER
const registerController = async (req, res) => {
  const body = req.body;
  const { username, email, password } = body;

  try {
    console.log(body);

    // console.log(req.body);

    if (!username || !password) {
      throw new Error("Missing anything");
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw new Error("User is already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hash,
    });
    await newUser.save();

    const accesstoken = jwt.sign({ email, _id: newUser._id, mindX });

    res.status(201).json({
      message: "Created successfully!",
      data: {
        _id: newUser._id,
        username,
        accesstoken,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    //   res.send("");
  }
};
export { loginController, registerController };
