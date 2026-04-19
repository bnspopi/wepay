import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    alert("Registration successful! Please login.");
    navigate("/");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "60px auto" }}>
      <h1 style={{ color: "#2b7fff" }}>WePay Register</h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>Create your account</p>

      <div>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginBottom: "12px", padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px" }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "12px", padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "16px", padding: "10px", width: "100%", boxSizing: "border-box", border: "1px solid #ddd", borderRadius: "8px" }}
        />
        <button
          onClick={handleRegister}
          style={{ padding: "10px 24px", background: "#2b7fff", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%", fontSize: "16px" }}
        >
          Register
        </button>
      </div>

      <p style={{ marginTop: "16px", fontSize: "14px" }}>
        Already have an account?{" "}
        <a href="/" style={{ color: "#2b7fff" }}>Login</a>
      </p>
    </div>
  );
}
