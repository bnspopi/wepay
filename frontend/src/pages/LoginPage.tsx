import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (password === "demo123" || (email === "demo" && password === "demo")) {
      navigate("/home");
    } else {
      alert("Invalid credentials. Use password: demo123");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "80px auto" }}>
      <h1 style={{ color: "#2b7fff" }}>WePay</h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>Digital Wallet for Government Welfare</p>

      <div>
        <input
          placeholder="Email (e.g. demo@wepay.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "12px", padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{ display: "block", marginBottom: "16px", padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px" }}
        />
        <button
          onClick={handleLogin}
          style={{ padding: "10px 24px", background: "#2b7fff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%", fontSize: "16px" }}
        >
          Login
        </button>
      </div>

      <p style={{ marginTop: "20px", color: "#888", fontSize: "14px" }}>
        Demo: any email &nbsp;|&nbsp; password: <strong>demo123</strong>
      </p>
    </div>
  );
}
