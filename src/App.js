import './App.css';
import { useEffect, useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [datetime, setDatetime] = useState("");
    const [description, setDescription] = useState("");
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions().then(setTransactions);
    }, []);

    async function getTransactions() {
        const url = process.env.REACT_APP_API_URL + "/transaction";
        const response = await fetch(url);
        return await response.json();
    }

    async function addNewTransaction(event) {
        event.preventDefault(); // Prevent page refresh

        const url = process.env.REACT_APP_API_URL + "/transaction";
        const price = parseFloat(name.split(" ")[0]);

        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.substring(name.indexOf(" ") + 1),
                price,
                datetime,
                description
            }),
        });

        if (response.ok) {
            setName("");
            setDatetime("");
            setDescription("");
            getTransactions().then(setTransactions); // Refresh transactions list
        }
    }

    let balance = transactions.reduce((sum, transaction) => sum + transaction.price, 0).toFixed(2);
    const [wholeBalance, fraction] = balance.split('.');

    return (
        <main>
            <h1>{wholeBalance}<span>.{fraction}</span></h1>
            <form onSubmit={addNewTransaction}>
                <div className="basic">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="iphone 16" />
                    <input value={datetime} onChange={(e) => setDatetime(e.target.value)} type="datetime-local" />
                </div>
                <div className="description">
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="description" />
                </div>
                <button type="submit">Add new transaction</button>
            </form>

            <div className="transactions">
                {transactions.length > 0 && transactions.map((transaction) => (
                    <div className="transaction" key={transaction.id}>
                        <div className="left">
                            <div className="name">{transaction.name}</div>
                            <div className="description">{transaction.description}</div>
                        </div>
                        <div className="right">
                            <div className={`price ${transaction.price < 0 ? 'red' : 'green'}`}>
                                {transaction.price}
                            </div>
                            <div className="datetime">{transaction.datetime}</div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default App;
