import { Router } from "express";
import {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} from "../controllers/TransactionController.js";

// //router object

const transactionRoute = Router();

//routers
// //GET || Get all transactions
transactionRoute.post("/get-transaction", getAllTransaction);

// //POST || Edit transactions
transactionRoute.post("/edit-transaction", editTransaction);

// //POST || Delete transactions
transactionRoute.post("/delete-transaction", deleteTransaction);

// //POST || Add transaction
transactionRoute.post("/add-transaction", addTransaction);

export default transactionRoute;
