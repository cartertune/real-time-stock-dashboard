import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';


interface StockPriceData {
  price: string;
  percentChange: string;
}

const STOCK_PRICE_WS_URL = 'ws://localhost:8080';

const useStockPriceSubscriber = (): { data: { [ticker: string]: StockPriceData } } => {
  const { token } = useAuth();
  const [data, setData] = useState({});

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`${STOCK_PRICE_WS_URL}?token=${token}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.prices) {
        setData(message.prices);
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [token]);

  return { data };
};

export default useStockPriceSubscriber;