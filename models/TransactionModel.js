import mongoose, { Schema } from "mongoose";

//schema design
const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },

    type: {
      type: String,
      required: [true, "type is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },

    reference: {
      type: String,
    },

    description: {
      type: String,
      required: [true, "description is required"],
    },

    date: {
      type: String,
      required: [true, "date is required"],
    },
  },
  { timestamps: true }
);

//export
const TransactionModel = mongoose.model("transaction", transactionSchema);
export default TransactionModel;
