import { useState } from "react";
import Layout from "../components/Layout";

const stateSchemes: Record<string, string[]> = {
  "Bihar": ["PM-KISAN", "MGNREGA", "Mukhyamantri Kanya Utthan"],
  "West Bengal": ["PM-KISAN", "MGNREGA", "Lakshmir Bhandar", "Kanyashree"],
  "Odisha": ["PM-KISAN", "MGNREGA", "KALIA", "Biju Swasthya Kalyan"],
  "Telangana": ["PM-KISAN", "MGNREGA", "Rythu Bandhu", "Dalit Bandhu"],
  "Andhra Pradesh": ["PM-KISAN", "MGNREGA", "YSR Rythu Bharosa", "Amma Vodi"],
  "Karnataka": ["PM-KISAN", "MGNREGA", "Gruha Lakshmi", "Yuva Nidhi"],
  "Uttar Pradesh": ["PM-KISAN", "MGNREGA", "Kanya Sumangala"],
};

const amounts: Record<string, number> = {
  "PM-KISAN": 6000, "MGNREGA": 36000, "Lakshmir Bhandar": 12000, "Kanyashree": 25000,
  "KALIA": 4000, "Biju Swasthya Kalyan": 500000, "Rythu Bandhu": 5000, "Dalit Bandhu": 1000000,
  "YSR Rythu Bharosa": 13500, "Amma Vodi": 15000, "Gruha Lakshmi": 24000, "Yuva Nidhi": 3000,
  "Kanya Sumangala": 15000, "Mukhyamantri Kanya Utthan": 50000,
};

export default function EligibilityPage() {
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [state, setState] = useState("");
  const [results, setResults] = useState<{ scheme: string; amount: number }[] | null>(null);

  const checkEligibility = () => {
    const userAge = Number(age);
    const userIncome = Number(income);

    if (!age || !income || !state) {
      alert("Please fill in all fields");
      return;
    }

    const schemeList = stateSchemes[state] || ["PM-KISAN", "MGNREGA"];
    const eligible = schemeList
      .filter(() => userIncome < 300000)
      .map((s) => ({ scheme: s, amount: amounts[s] || 1500 }));

    if (userAge >= 60) {
      eligible.push({ scheme: "Senior Citizen Pension", amount: 6000 });
    }

    setResults(eligible.length > 0 ? eligible : []);
  };

  return (
    <Layout>
      <h1 style={{ marginBottom: "24px" }}>Welfare Eligibility Checker</h1>

      <div style={{ background: "white", padding: "28px", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", maxWidth: "480px", marginBottom: "24px" }}>
        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500, fontSize: "14px" }}>Age</label>
          <input type="number" placeholder="Enter your age" value={age} onChange={(e) => { setAge(e.target.value); setResults(null); }}
            style={{ padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px" }} />
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500, fontSize: "14px" }}>Annual Income (₹)</label>
          <input type="number" placeholder="Enter annual income" value={income} onChange={(e) => { setIncome(e.target.value); setResults(null); }}
            style={{ padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px" }} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500, fontSize: "14px" }}>State</label>
          <select value={state} onChange={(e) => { setState(e.target.value); setResults(null); }}
            style={{ padding: "10px", width: "100%", border: "1px solid #ddd", borderRadius: "8px", fontSize: "15px" }}>
            <option value="">Select your state</option>
            {Object.keys(stateSchemes).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <button onClick={checkEligibility}
          style={{ padding: "12px", background: "#2b7fff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px", width: "100%", fontWeight: 600 }}>
          Check Eligibility
        </button>
      </div>

      {results !== null && (
        <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb", maxWidth: "480px" }}>
          <h3 style={{ margin: "0 0 16px 0", color: results.length > 0 ? "#10b981" : "#ef4444" }}>
            {results.length > 0 ? `✅ Eligible for ${results.length} scheme(s)` : "❌ Not eligible for any schemes"}
          </h3>
          {results.map(({ scheme, amount }) => (
            <div key={scheme} style={{ padding: "12px 16px", background: "#f0fdf4", borderRadius: "10px", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 500, fontSize: "14px" }}>{scheme}</span>
              <span style={{ color: "#10b981", fontWeight: 700 }}>₹{amount.toLocaleString()}/yr</span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
