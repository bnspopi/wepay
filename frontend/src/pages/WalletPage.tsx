import { useState } from "react";
import Layout from "../components/Layout";

export default function WalletPage() {

  const [balance, setBalance] = useState(5000);
  const [amount, setAmount] = useState("");

  const addFunds = () => {

    const value = Number(amount);

    if (value <= 0) {
      alert("Enter valid amount");
      return;
    }

    setBalance(balance + value);
    setAmount("");

    alert("Money added successfully");

  };

  return (

    <Layout>

      <h1>Digital Wallet</h1>

      <h2>Current Balance: ₹{balance}</h2>

      <div style={{ marginTop: "20px" }}>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button onClick={addFunds}>
          Add Money
        </button>

      </div>

    </Layout>

  );
}
