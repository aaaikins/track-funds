import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "./models/transaction.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

// ✅ Secure MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ✅ Add Transaction with Error Handling
app.post("/api/transaction", async (req, res) => {
    try {
        const { name, datetime, description, price } = req.body;
        if (!name || !datetime || !description || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const transaction = await Transaction.create({ name, datetime, description, price });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: "Failed to add transaction" });
    }
});

// ✅ Get Transactions with Error Handling
app.get("/api/transaction", async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ datetime: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
