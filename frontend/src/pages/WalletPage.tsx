import Layout from "../components/Layout";

export default function WalletPage() {

  return (

    <Layout>

      <h1>Digital Wallet</h1>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "300px"
      }}>

        <h3>Balance</h3>
        <h2>₹5,000</h2>

        <button>Add Funds</button>

      </div>

    </Layout>

  );
}
