import Layout from "../components/Layout";

const transactions = [
  { id: "txn-001", to: "Ramesh Singh", did: "demo-user-1", amount: 500, type: "p2p", status: "completed", date: "2026-04-18" },
  { id: "txn-002", to: "Sita Devi", did: "demo-user-2", amount: 1200, type: "p2p", status: "completed", date: "2026-04-17" },
  { id: "txn-003", from: "Govt. Welfare", did: "gov-scheme", amount: 2000, type: "welfare", status: "completed", date: "2026-04-15" },
  { id: "txn-004", to: "Agent001", did: "agent-01", amount: 800, type: "p2p", status: "flagged", date: "2026-04-12" },
];

export default function TransactionHistoryPage() {
  return (
    <Layout>
      <h1 style={{ marginBottom: "24px" }}>Transaction History</h1>

      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["ID", "Party", "Amount", "Type", "Status", "Date"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#64748b", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={t.id} style={{ borderBottom: i < transactions.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                <td style={{ padding: "12px 16px", fontSize: "13px", color: "#64748b" }}>{t.id}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px" }}>{t.to || t.from}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 600, color: t.type === "welfare" ? "#10b981" : "#1e293b" }}>
                  {t.type === "welfare" ? "+" : "-"}₹{t.amount}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "12px", background: t.type === "welfare" ? "#d1fae5" : "#eff6ff", color: t.type === "welfare" ? "#065f46" : "#1d4ed8" }}>
                    {t.type}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "12px", background: t.status === "completed" ? "#d1fae5" : "#fef3c7", color: t.status === "completed" ? "#065f46" : "#92400e" }}>
                    {t.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", fontSize: "13px", color: "#64748b" }}>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
