import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

//config dotenv file
dotenv.config();

//
const app = express();

//

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes

//user route
app.use("/api/v1/users", userRoute);

//transaction route
app.use("/api/v1/transactions", transactionRoute);

const PORT = 8080 || process.env.PORT;

//database connection
//listen server

connectDB().then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      console.log(`${error}`.bgRed);
      return;
    }

    console.log(`Server running at http://localhost:${PORT}`.bgCyan.white);
  });
});
