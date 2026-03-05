import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../i18n/languageContext";

export default function Layout({ children }: any) {

  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>WePay</h2>

        {/* Language Switch */}
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: "6px",
              borderRadius: "6px",
              width: "100%",
              border: "none",
            }}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
          </select>
        </div>

        {/* Navigation */}
        <nav style={{ marginTop: "20px" }}>
          <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
            <p>Dashboard</p>
          </Link>

          <Link to="/wallet" style={{ color: "white", textDecoration: "none" }}>
            <p>Wallet</p>
          </Link>

          <Link to="/transaction" style={{ color: "white", textDecoration: "none" }}>
            <p>Send Money</p>
          </Link>

          <Link to="/transactions" style={{ color: "white", textDecoration: "none" }}>
            <p>Transactions</p>
          </Link>

          <Link to="/eligibility" style={{ color: "white", textDecoration: "none" }}>
            <p>Eligibility</p>
          </Link>

          <Link to="/schemes" style={{ color: "white", textDecoration: "none" }}>
            <p>Schemes</p>
          </Link>

          <Link to="/welfare" style={{ color: "white", textDecoration: "none" }}>
            <p>Welfare</p>
          </Link>

          <Link to="/agent" style={{ color: "white", textDecoration: "none" }}>
            <p>Agent Portal</p>
          </Link>
        </nav>
      </div>

      {/* Page Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f8fafc",
        }}
      >
        {children}
      </div>
    </div>
  );
}
