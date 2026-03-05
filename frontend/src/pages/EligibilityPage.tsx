import { useState } from "react";
import Layout from "../components/Layout";

export default function EligibilityPage() {

  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [result, setResult] = useState("");

  const checkEligibility = () => {

    const userAge = Number(age);
    const userIncome = Number(income);

    if (userAge >= 60) {

      setResult("Eligible for Senior Citizen Pension");

    } else if (userIncome < 200000) {

      setResult("Eligible for Government Welfare Scheme");

    } else {

      setResult("Not eligible for welfare schemes");

    }

  };

  return (

    <Layout>

      <h1>Welfare Eligibility Checker</h1>

      <div style={{ marginTop: "20px" }}>

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ padding: "8px", display: "block", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Enter Annual Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          style={{ padding: "8px", display: "block", marginBottom: "10px" }}
        />

        <button onClick={checkEligibility}>
          Check Eligibility
        </button>

        {result && (
          <h3 style={{ marginTop: "20px" }}>
            {result}
          </h3>
        )}

      </div>

    </Layout>

  );
}
