import React, { useState } from "react";
import _ from 'lodash'
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/AuthProvider";
import { addStockToWatchlist } from "../../api/watchlist";
import useFetchWatchList from "../../hooks/useFetchWatchlist";
import useStockPriceSubscriber from "../../hooks/useStockPriceSubscriber";
import './dashboard.css'
import Input from "../../components/Input";

interface Stock {
  id: string;
  stock_ticker: string;
}


function Dashboard() {
  const { signOut, session } = useAuth()
  const [stockTicker, setStockTicker] = useState<string>('');

  const { data: watchlist, loading, refetch: refetchWatchList } = useFetchWatchList()
  const { data: stockPriceData } = useStockPriceSubscriber();



  const handleAddStock = async () => {
    addStockToWatchlist(stockTicker).then(res => {
      refetchWatchList()
      toast.success("Stock was added to your watchlist")
      setStockTicker('')
    }).catch(e => toast.error(e.response?.data?.error || "Error adding stock to watchlist."))
  }

  const renderWatchList = () => {
    if (loading) return <p>Loading...</p>

    if (_.isEmpty(watchlist)) return <p>Add a stock ticker to get started.</p>

    return <table className="watchlist">
      <thead>
        <tr>
          <th>TICKER</th>
          <th>PRICE</th>
        </tr>
      </thead>
      <tbody>
        {_.map(watchlist, (stock: Stock) => {
          const price = stockPriceData[stock.stock_ticker]?.price
          const percentChange = stockPriceData[stock.stock_ticker]?.percentChange

          return (
            <tr key={stock.id}>
              <td><h4>{stock.stock_ticker}</h4></td>
              <td className="price">
                <h4>{price || 'loading...'}</h4>
                <p className={`percent ${percentChange?.startsWith('-') ? ' red' : ''}`}>{percentChange || '-'}</p>
              </td>
            </tr>)
        })}
      </tbody>
    </table>
  }

  return (
    <div className="dashboard-page">
      <div className="header">
        <img src="./stockbase-logo.png" className="stockbase-logo" alt="logo" />
        <button className="secondary_button" onClick={signOut}>Sign Out</button>
      </div>
      <div className="content">
        <div className="input-button-container">
          <Input value={stockTicker} onChange={val => setStockTicker(_.toUpper(val))} label="Stock Ticker" type="text" placeholder="Ticker (i.e MSFT, NVDA)" />
          <button onClick={handleAddStock}>Add Stock</button>
        </div>
        {renderWatchList()}
      </div>
    </div>
  );
}

export default Dashboard;