import Layout from "../components/Layout";

const schemes = [
  { id: 1, name: "PM Kisan Samman Nidhi", desc: "₹6,000/year direct income support for farmers.", category: "Agriculture", amount: "₹6,000/yr", color: "#10b981" },
  { id: 2, name: "MGNREGA", desc: "100 days guaranteed wage employment per year.", category: "Employment", amount: "₹36,000/yr", color: "#f59e0b" },
  { id: 3, name: "Ayushman Bharat", desc: "Health coverage up to ₹5 lakh per family per year.", category: "Health", amount: "₹5,00,000/yr", color: "#ef4444" },
  { id: 4, name: "PM Awas Yojana", desc: "Financial assistance for construction of pucca houses.", category: "Housing", amount: "₹1,20,000", color: "#8b5cf6" },
  { id: 5, name: "Janani Suraksha Yojana", desc: "Cash assistance for safe institutional delivery.", category: "Health", amount: "₹1,400", color: "#ec4899" },
  { id: 6, name: "PM Ujjwala Yojana", desc: "Free LPG connections to women in BPL households.", category: "Energy", amount: "₹1,600", color: "#f97316" },
];

export default function WelfareSchemesPage() {
  return (
    <Layout>
      <h1 style={{ marginBottom: "8px" }}>Government Schemes</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>Central and state welfare schemes available to you</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {schemes.map((scheme) => (
          <div key={scheme.id} style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "12px", background: "#f1f5f9", color: "#475569" }}>{scheme.category}</span>
              <span style={{ fontWeight: 700, color: scheme.color }}>{scheme.amount}</span>
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>{scheme.name}</h3>
            <p style={{ margin: "0 0 16px 0", color: "#64748b", fontSize: "14px" }}>{scheme.desc}</p>
            <button style={{ padding: "8px 20px", background: scheme.color, color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 500 }}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
