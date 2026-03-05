import { Link } from "react-router-dom";

export default function Layout({ children }: any) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}>

        <h2>WePay</h2>

        <nav style={{ marginTop: "30px" }}>

          <Link to="/home"><p>Dashboard</p></Link>
          <Link to="/wallet"><p>Wallet</p></Link>
          <Link to="/transaction"><p>Send Money</p></Link>
          <Link to="/transactions"><p>Transactions</p></Link>
          <Link to="/eligibility"><p>Eligibility</p></Link>
          <Link to="/schemes"><p>Schemes</p></Link>
          <Link to="/welfare"><p>Welfare</p></Link>
          <Link to="/agent"><p>Agent Portal</p></Link>

        </nav>

      </div>

      {/* Page Content */}
      <div style={{ flex: 1, padding: "30px", background: "#f8fafc" }}>
        {children}
      </div>

    </div>
  );
}
