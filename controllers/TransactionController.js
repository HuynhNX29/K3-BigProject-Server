import TransactionModel from "../models/TransactionModel.js";

const getAllTransaction = async (req, res) => {
  try {
    const transaction = await TransactionModel.findOne({});

    res.status(200).json({
      message: "Get all transactions successfully!",
      data: {
        _id: transaction._id,
      },
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

export { getAllTransaction, addTransaction };
