import mongoose, { model, Schema } from "mongoose";

const TransactionSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes extra spaces
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => !isNaN(value),
            message: "Price must be a valid number",
        },
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    datetime: {
        type: Date,
        required: true,
        index: true, // Improves search performance
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const TransactionModel = model("Transaction", TransactionSchema);

export default TransactionModel;
