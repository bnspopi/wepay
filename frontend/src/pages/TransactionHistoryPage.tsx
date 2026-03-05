import Layout from "../components/Layout";

export default function TransactionHistoryPage() {

  const transactions = [

    { id: 1, to: "User123", amount: 500 },
    { id: 2, to: "User456", amount: 1200 },
    { id: 3, to: "Agent001", amount: 800 }

  ];

  return (

    <Layout>

      <h1>Transaction History</h1>

      <table border={1} cellPadding={10} style={{ marginTop: "20px" }}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Receiver</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((t) => (

            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.to}</td>
              <td>₹{t.amount}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </Layout>

  );
}
