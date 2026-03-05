import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    alert("Login Successful!");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Login to WePay</h1>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", width: "250px" }}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", width: "250px" }}
          />
        </div>

        <br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
