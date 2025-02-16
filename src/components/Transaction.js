import React from 'react';


function Transaction(props) {
    return (
        <div className="transaction" key={props.id}>
            <div className="left">
                <div className="name">{props.name}</div>
                <div className="description">{props.description}</div>
            </div>
            <div className="mid">
                <button className="update-btn" onClick={() => props.updateTransaction(props.id)}>update</button>
                <button className="delete-btn" onClick={() => props.deleteTransaction(props.id)}>delete</button>
</div>
            <div className="right">
                <div className={`price ${props.price < 0 ? 'red' : 'green'}`}>
                    {props.price}
                </div>
                <div className="datetime">{props.datetime}</div>
            </div>
        </div>
    )
}

export default Transaction;