import { useState } from "react";
import Layout from "../components/Layout";

export default function TransactionPage() {

  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const sendMoney = () => {

    const value = Number(amount);

    if (!receiver) {
      alert("Enter receiver ID");
      return;
    }

    if (value <= 0) {
      alert("Enter valid amount");
      return;
    }

    alert(`₹${value} sent to ${receiver} successfully`);

    setReceiver("");
    setAmount("");

  };

  return (

    <Layout>

      <h1>Send Money</h1>

      <div style={{ marginTop: "20px" }}>

        <input
          placeholder="Receiver ID"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          style={{ padding: "8px", display: "block", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "8px", display: "block", marginBottom: "10px" }}
        />

        <button onClick={sendMoney}>
          Send Money
        </button>

      </div>

    </Layout>

  );
}
