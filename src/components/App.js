import '../App.css';
import { useEffect, useState } from "react";
import Transaction from "./Transaction.js";

function App() {
    const [name, setName] = useState("");
    const [datetime, setDatetime] = useState("");
    const [description, setDescription] = useState("");
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions().then(setTransactions);
    }, []);

    async function getTransactions() {
        const url = process.env.REACT_APP_API_URL + "/api/transaction";
        const response = await fetch(url);
        return response.ok ? await response.json() : [];
    }

    async function addNewTransaction(event) {
        event.preventDefault();
        const url = process.env.REACT_APP_API_URL + "/api/transaction";
        const price = parseFloat(name.split(" ")[0]) || 0;

        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.substring(name.indexOf(" ") + 1) || name,
                price,
                datetime,
                description
            }),
        });

        if (response.ok) {
            setName("");
            setDatetime("");
            setDescription("");
            getTransactions().then(setTransactions);
        }
    }

    async function updateTransaction(id) {
        const url = `${process.env.REACT_APP_API_URL}/api/transaction/${id}`;
        const price = parseFloat(name.split(" ")[0]) || 0;
        const response = await fetch(url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name.substring(name.indexOf(" ") + 1) || name, price, datetime, description })
        });
        if (response.ok) {
            getTransactions().then(setTransactions);
        }
    }

    async function deleteTransaction(id) {
        const url = `${process.env.REACT_APP_API_URL}/api/transaction/${id}`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            getTransactions().then(setTransactions);
        }
    }

    let balance = transactions.reduce((sum, transaction) => sum + (transaction.price || 0), 0).toFixed(2);
    const [wholeBalance, fraction] = balance.includes('.') ? balance.split('.') : [balance, "00"];

    return (
        <main>
            <h1>{wholeBalance}<span>.{fraction}</span></h1>
            <form onSubmit={addNewTransaction}>
                <div className="basic">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Amount Item" />
                    <input value={datetime} onChange={(e) => setDatetime(e.target.value)} type="datetime-local" />
                </div>
                <div className="description">
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
                </div>
                <button type="submit">Add new transaction</button>
            </form>

            <div className="transactions">
                {transactions.length > 0 && transactions.map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        id={transaction.id}
                        name={transaction.name}
                        description={transaction.description}
                        price={transaction.price}
                        datetime={transaction.datetime}
                        updateTransaction={updateTransaction}
                        deleteTransaction={deleteTransaction}
                    />
                ))}
            </div>
        </main>
    );
}

export default App;
