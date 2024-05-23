import React, { useEffect, useState } from "react";
import _ from 'lodash'
import { useAuth } from "../../context/AuthProvider";
import Input from "../../components/Input";
import { addStockToWatchlist, fetchStockWatchlist } from "../../api/watchlist";
import './dashboard.css'

interface Stock {
  id: string;
  stock_ticker: string;
}

function Dashboard() {
  const { signOut } = useAuth()
  const [stockTicker, setStockTicker] = useState<string>('');
  const [watchlist, setWatchList] = useState([])

  useEffect(() => {
    fetchStockWatchlist()
      .then(watchlist => setWatchList(watchlist));
  }, [])


  const handleAddStock = async () => {
    await addStockToWatchlist(stockTicker);
    fetchStockWatchlist()
      .then(watchlist => setWatchList(watchlist));

    // If Success, show toast, and clear
    setStockTicker('')

    // If failure, show error
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
        <table className="watchlist">
          <thead>
            <tr>
              <th>TICKER</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {_.map(watchlist, (stock: Stock) => {
              return (
                <tr key={stock.id}>
                  <td><h4>{stock.stock_ticker}</h4></td>
                  <td className="price"><h4>$4.86</h4></td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;