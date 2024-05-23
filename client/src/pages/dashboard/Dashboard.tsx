import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import './dashboard.css'
import Input from "../../components/Input";

function Dashboard() {
  const { signOut } = useAuth()
  const [stockTicker, setStockTicker] = useState<string>('');

  const handleAddStock = () => {

  }

  return (
    <div className="dashboard-page">
      <div className="header">
        <img src="./stockbase-logo.png" className="stockbase-logo" alt="logo" />
        <button className="secondary_button" onClick={signOut}>Sign Out</button>
      </div>
      <div className="content">
        <div className="input-button-container">
          <Input value={stockTicker} onChange={setStockTicker} label="Stock Ticker" type="text" placeholder="Ticker (i.e MSFT, NVDA)" />
          <button onClick={handleAddStock}>Add Stock</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;