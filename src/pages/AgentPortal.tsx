import Layout from "../components/Layout";

const stats = [
  { label: "Total Users", value: "128", color: "#2b7fff" },
  { label: "Verified Today", value: "14", color: "#10b981" },
  { label: "Pending Docs", value: "7", color: "#f59e0b" },
  { label: "Verification Rate", value: "99%", color: "#8b5cf6" },
];

const recentUsers = [
  { name: "Ramesh Singh", location: "Saran, Bihar", status: "verified", did: "demo-user-1" },
  { name: "Sita Devi", location: "Saran, Bihar", status: "verified", did: "demo-user-2" },
  { name: "Priya Sharma", location: "Patna, Bihar", status: "pending", did: "demo-user-4" },
  { name: "Mohan Lal", location: "Muzaffarpur, Bihar", status: "pending", did: "demo-user-5" },
];

export default function AgentPortal() {
  return (
    <Layout>
      <h1 style={{ marginBottom: "8px" }}>Agent Dashboard</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>Manage users and verify identity documents</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {stats.map(({ label, value, color }) => (
          <div key={label} style={{ background: "white", padding: "20px", borderRadius: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 8px 0", color: "#64748b", fontSize: "13px" }}>{label}</p>
            <h2 style={{ margin: 0, color, fontSize: "28px" }}>{value}</h2>
          </div>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb" }}>
          <h3 style={{ margin: 0 }}>Recent Users</h3>
        </div>
        {recentUsers.map((u, i) => (
          <div key={u.did} style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < recentUsers.length - 1 ? "1px solid #f1f5f9" : "none" }}>
            <div>
              <p style={{ margin: "0 0 3px 0", fontWeight: 500 }}>{u.name}</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>{u.location}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ padding: "3px 12px", borderRadius: "999px", fontSize: "12px", background: u.status === "verified" ? "#d1fae5" : "#fef3c7", color: u.status === "verified" ? "#065f46" : "#92400e" }}>
                {u.status}
              </span>
              {u.status === "pending" && (
                <button style={{ padding: "6px 14px", background: "#2b7fff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
                  Verify
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
