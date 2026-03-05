import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {

    if(username === "demo" && password === "demo"){

      alert("Login successful");

      navigate("/home");

    } else {

      alert("Invalid credentials");

    }

  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>Login Page</h1>

      <p>User login portal</p>

      <div style={{ marginTop: "20px" }}>

        <input
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          style={{ display:"block", marginBottom:"10px", padding:"8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{ display:"block", marginBottom:"10px", padding:"8px" }}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

      <p style={{ marginTop:"20px" }}>
        Demo user: demo  
        <br/>
        Demo password: demo
      </p>

    </div>

  );

}

    <div>

      <h1>Login</h1>

      <p>Demo User: demo@wepay.com</p>
      <p>Password: demo123</p>

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/>

      <button onClick={handleLogin}>Login</button>

    </div>

  );
}
