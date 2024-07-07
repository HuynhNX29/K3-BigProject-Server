import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/UserController.js";

//router object

const userRoute = express.Router();

//routers
//POST || LOGIN
userRoute.post("/login", loginController);

//POST || REGISTER
userRoute.post("/register", registerController);
export default userRoute;