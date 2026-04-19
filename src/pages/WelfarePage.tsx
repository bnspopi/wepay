import Layout from "../components/Layout";

const payments = [
  { id: 1, scheme: "PM-KISAN", amount: 2000, date: "2026-04-01", status: "paid" },
  { id: 2, scheme: "MGNREGA", amount: 3000, date: "2026-03-15", status: "paid" },
  { id: 3, scheme: "Lakshmir Bhandar", amount: 1000, date: "2026-03-01", status: "paid" },
];

export default function WelfarePage() {
  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Layout>
      <h1 style={{ marginBottom: "8px" }}>Welfare Dashboard</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>Overview of your government welfare benefits</p>

      <div style={{ background: "linear-gradient(135deg, #10b981, #059669)", padding: "28px", borderRadius: "20px", color: "white", marginBottom: "24px", maxWidth: "360px" }}>
        <p style={{ margin: "0 0 8px 0", opacity: 0.85, fontSize: "14px" }}>Total Welfare Received</p>
        <h2 style={{ margin: 0, fontSize: "32px" }}>₹{total.toLocaleString()}</h2>
        <p style={{ margin: "8px 0 0 0", opacity: 0.75, fontSize: "13px" }}>Across {payments.length} schemes</p>
      </div>

      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", overflow: "hidden", maxWidth: "600px" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: 0 }}>Payment History</h3>
        </div>
        {payments.map((p, i) => (
          <div key={p.id} style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < payments.length - 1 ? "1px solid #f1f5f9" : "none" }}>
            <div>
              <p style={{ margin: "0 0 4px 0", fontWeight: 500 }}>{p.scheme}</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>{p.date}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "0 0 4px 0", fontWeight: 700, color: "#10b981" }}>+₹{p.amount}</p>
              <span style={{ padding: "2px 10px", borderRadius: "999px", fontSize: "12px", background: "#d1fae5", color: "#065f46" }}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
