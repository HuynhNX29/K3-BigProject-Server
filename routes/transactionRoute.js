import { Router } from "express";
import {
  addTransaction,
  getAllTransaction,
} from "../controllers/TransactionController.js";

// //router object

const transactionRoute = Router();

//routers
// //GET || Get all transactions
transactionRoute.post("/get-transaction", getAllTransaction);

// //POST || Add transaction
transactionRoute.post("/add-transaction", addTransaction);

export default transactionRoute;
