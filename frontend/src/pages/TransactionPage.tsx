import Layout from "../components/Layout";

export default function TransactionPage() {

  return (

    <Layout>

      <h1>Send Money</h1>

      <input placeholder="Receiver ID" />
      <br /><br />

      <input placeholder="Amount" />
      <br /><br />

      <button>Send</button>

    </Layout>

  );
}
