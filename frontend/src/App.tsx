import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import TransactionPage from "./pages/TransactionPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import EligibilityPage from "./pages/EligibilityPage";
import WelfarePage from "./pages/WelfarePage";
import WelfareSchemesPage from "./pages/WelfareSchemesPage";
import AgentPortal from "./pages/AgentPortal";

export default function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/wallet" element={<WalletPage />} />

        <Route path="/transaction" element={<TransactionPage />} />

        <Route path="/transactions" element={<TransactionHistoryPage />} />

        <Route path="/eligibility" element={<EligibilityPage />} />

        <Route path="/welfare" element={<WelfarePage />} />

        <Route path="/schemes" element={<WelfareSchemesPage />} />

        <Route path="/agent" element={<AgentPortal />} />

      </Routes>

    </BrowserRouter>

  )

}
