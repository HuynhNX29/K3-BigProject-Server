import userModel from "../models/UserModels.js";

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      throw new Error("Missing email or password");
    }

    const user = await userModel.findOne({ email, password });

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
  try {
    const { email, password } = body;

    if (!password || !email) {
      throw new Error("Missing email or password");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User is already registered");
    }

    const newUser = new userModel({ email, password });
    await newUser.save();
    
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
    //   res.send("");
  }
};
export { loginController, registerController };
