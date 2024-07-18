import TransactionModel from "../models/TransactionModel.js";
import moment from "moment";

const getAllTransaction = async (req, res) => {
  try {
    const { userid, frequency, selectedDate, type } = req.body;
    const transaction = await TransactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),

      userid: userid,

      ...(type !== "all" && { type }),
    });

    res.status(200).json({
      message: "Get all transactions successfully!",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);

    await newTransaction.save();

    res.status(201).json({
      message: "Add new transaction successfully!",
      data: {
        _id: newTransaction._id,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const editTransaction = async (req, res) => {
  try {
    await TransactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(201).json({
      message: "Edit successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await TransactionModel.findOneAndDelete({
      _id: req.body.transactionId,
    });

    res.status(201).json({
      message: "Delete successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
