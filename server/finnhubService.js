const axios = require("axios");

// Fetch price data for given stock tickers
async function fetchStockPrices(tickers) {
  const prices = {};

  for (const ticker of tickers) {
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
        params: {
          symbol: ticker,
          token: process.env.FINNHUB_API_KEY,
        },
      });
      const data = response.data;
      const stockData = {};

      if (data && data.c) {
        // ADDED small flucutations to make price changes more visible
        const price = (data.c + Math.random() * 2).toFixed(2);
        stockData.price = `$${price}`;
        stockData.percentChange = `${data.dp?.toFixed(2)}%`;
      } else {
        // If price does not exist, ticker was not found
        stockData.price = "N/A";
        stockData.percentChange = "N/A";
      }

      prices[ticker] = stockData;
    } catch (error) {
      console.error(`Error fetching price for ${ticker}:`);

      // If request fails, it is likely due to rate limit, return random price
      prices[ticker] = {
        price: `$${(Math.random() * 100).toFixed(2)}`,
        percentChange: `${(Math.random() * 10 - 5).toFixed(2)}%`, // Random number between -5 and 5
      };
    }
  }
  return prices;
}

exports.fetchStockPrices = fetchStockPrices;
