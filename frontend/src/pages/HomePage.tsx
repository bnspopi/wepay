import Layout from "../components/Layout";

export default function HomePage() {

  return (

    <Layout>

      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h3>Wallet Balance</h3>
          <h2>₹5,000</h2>
        </div>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h3>Active Schemes</h3>
          <p>3</p>
        </div>

      </div>

    </Layout>

  );
}
