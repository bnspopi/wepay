import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function HomePage() {
  const [balance] = useState(5000);
  const [username] = useState("Demo User");

  return (
    <Layout>
      <h1 style={{ marginBottom: "8px" }}>Dashboard</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>Welcome back, {username}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
          <p style={{ margin: "0 0 8px 0", color: "#64748b", fontSize: "14px" }}>Wallet Balance</p>
          <h2 style={{ margin: 0, color: "#2b7fff", fontSize: "28px" }}>₹{balance.toLocaleString()}</h2>
        </div>

        <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
          <p style={{ margin: "0 0 8px 0", color: "#64748b", fontSize: "14px" }}>Active Schemes</p>
          <h2 style={{ margin: 0, color: "#10b981", fontSize: "28px" }}>3</h2>
        </div>

        <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
          <p style={{ margin: "0 0 8px 0", color: "#64748b", fontSize: "14px" }}>Welfare Received</p>
          <h2 style={{ margin: 0, color: "#f59e0b", fontSize: "28px" }}>₹12,000</h2>
        </div>
      </div>

      <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
        <h3 style={{ margin: "0 0 16px 0" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "Send Money", path: "/transaction", color: "#2b7fff" },
            { label: "Add Funds", path: "/wallet", color: "#10b981" },
            { label: "Check Schemes", path: "/schemes", color: "#f59e0b" },
            { label: "Eligibility", path: "/eligibility", color: "#8b5cf6" },
          ].map(({ label, path, color }) => (
            <a
              key={path}
              href={path}
              style={{ padding: "10px 20px", background: color, color: "white", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
