import { useState } from "react";
import Layout from "../components/Layout";

export default function TransactionPage() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const sendMoney = () => {
    const value = Number(amount);
    if (!receiver.trim()) {
      setMessage({ text: "Please enter a Receiver ID or DID", type: "error" });
      return;
    }
    if (!amount || value <= 0) {
      setMessage({ text: "Please enter a valid amount", type: "error" });
      return;
    }
    setMessage({ text: `✅ ₹${value} sent to ${receiver} successfully!`, type: "success" });
    setReceiver("");
    setAmount("");
    setDescription("");
  };

  return (
    <Layout>
      <h1 style={{ marginBottom: "24px" }}>Send Money</h1>

      <div style={{ background: "white", padding: "28px", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", maxWidth: "460px" }}>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500, fontSize: "14px", color: "#374151" }}>Receiver ID / DID</label>
          <input
            placeholder="Enter receiver DID or ID"
            value={receiver}
            onChange={(e) => { setReceiver(e.target.value); setMessage(null); }}
            style={{ padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500, fontSize: "14px", color: "#374151" }}>Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setMessage(null); }}
            style={{ padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500, fontSize: "14px", color: "#374151" }}>Description (optional)</label>
          <input
            placeholder="e.g. Food, Medicine..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px" }}
          />
        </div>

        <button
          onClick={sendMoney}
          style={{ padding: "12px", background: "#2b7fff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px", width: "100%", fontWeight: 600 }}
        >
          Send Money
        </button>

        {message && (
          <p style={{ marginTop: "12px", color: message.type === "success" ? "#10b981" : "#ef4444", fontWeight: 500 }}>
            {message.text}
          </p>
        )}
      </div>

      <div style={{ background: "#eff6ff", padding: "16px", borderRadius: "12px", border: "1px solid #bfdbfe", marginTop: "20px", maxWidth: "460px" }}>
        <p style={{ margin: 0, fontSize: "13px", color: "#1d4ed8" }}>
          🔒 All transactions are secured with multi-layer fraud detection.
        </p>
      </div>
    </Layout>
  );
}
