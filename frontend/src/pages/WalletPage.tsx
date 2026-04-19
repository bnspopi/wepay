import { useState } from "react";
import Layout from "../components/Layout";

export default function WalletPage() {
  const [balance, setBalance] = useState(5000);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const addFunds = () => {
    const value = Number(amount);
    if (!amount || value <= 0) {
      setMessage("Please enter a valid amount");
      return;
    }
    setBalance((prev) => prev + value);
    setMessage(`✅ ₹${value} added successfully`);
    setAmount("");
  };

  return (
    <Layout>
      <h1 style={{ marginBottom: "24px" }}>Digital Wallet</h1>

      <div style={{ background: "linear-gradient(135deg, #2b7fff, #1d4ed8)", padding: "32px", borderRadius: "20px", color: "white", marginBottom: "24px", maxWidth: "400px" }}>
        <p style={{ margin: "0 0 8px 0", opacity: 0.8, fontSize: "14px" }}>Current Balance</p>
        <h2 style={{ margin: 0, fontSize: "36px" }}>₹{balance.toLocaleString()}</h2>
      </div>

      <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", maxWidth: "400px" }}>
        <h3 style={{ margin: "0 0 16px 0" }}>Add Money</h3>
        <input
          type="number"
          placeholder="Enter amount (₹)"
          value={amount}
          onChange={(e) => { setAmount(e.target.value); setMessage(""); }}
          style={{ padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "12px", fontSize: "15px" }}
        />
        <button
          onClick={addFunds}
          style={{ padding: "10px 24px", background: "#10b981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px", width: "100%" }}
        >
          Add Money
        </button>
        {message && <p style={{ marginTop: "12px", color: message.startsWith("✅") ? "#10b981" : "#ef4444" }}>{message}</p>}
      </div>

      {/* Locked savings note */}
      <div style={{ background: "#fef3c7", padding: "16px", borderRadius: "12px", border: "1px solid #fcd34d", marginTop: "20px", maxWidth: "400px" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#92400e" }}>
          💡 <strong>Tip:</strong> You can lock savings to prevent accidental spending. Contact your agent for more details.
        </p>
      </div>
    </Layout>
  );
}
