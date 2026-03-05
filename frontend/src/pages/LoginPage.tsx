import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {

    if(email === "demo@wepay.com" && password === "demo123"){

      alert("Login Successful");

      navigate("/home");

    } else {

      alert("Invalid credentials");

    }

  };

  return (

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
