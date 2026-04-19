import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../i18n/languageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#1e293b", color: "white", padding: "20px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <h2 style={{ margin: "0 0 8px 0", color: "#2b7fff" }}>WePay</h2>
        <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#94a3b8" }}>Welfare Digital Wallet</p>

        {/* Language Switch */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: "6px", borderRadius: "6px", width: "100%", border: "none", marginBottom: "20px", fontSize: "13px" }}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="bn">বাংলা</option>
        </select>

        {/* Navigation */}
        <nav style={{ flex: 1 }}>
          {[
            { to: "/home", label: "Dashboard" },
            { to: "/wallet", label: "Wallet" },
            { to: "/transaction", label: "Send Money" },
            { to: "/transactions", label: "Transactions" },
            { to: "/eligibility", label: "Eligibility" },
            { to: "/schemes", label: "Schemes" },
            { to: "/welfare", label: "Welfare" },
            { to: "/agent", label: "Agent Portal" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{ color: "#cbd5e1", textDecoration: "none", display: "block", padding: "8px 10px", borderRadius: "6px", marginBottom: "2px", fontSize: "14px" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#334155")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{ padding: "8px", background: "#334155", color: "#94a3b8", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}
        >
          Logout
        </button>
      </div>

      {/* Page Content */}
      <div style={{ flex: 1, padding: "30px", background: "#f8fafc", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}
