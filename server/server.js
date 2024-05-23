const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");
const { authenticateRequest, verifyToken } = require("./util");
const { fetchStockPrices } = require("./finnhubService");
const { supabase } = require("./supabaseClient");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ------- Stock Price Websocket --------------------

const wss = new WebSocket.Server({ server });
wss.on("connection", (ws, req) => {
  const token = req.url.split("token=")[1];
  const user = verifyToken(token);

  if (!user) {
    ws.close(1008, "Unauthorized");
    return;
  }

  const fetchAndEmitPrices = async () => {
    const { data: watchlist, error } = await supabase
      .from("watchlist")
      .select("stock_ticker")
      .eq("user_id", user.sub);

    if (error) {
      ws.send(JSON.stringify({ error: "Failed to fetch watchlist" }));
      return;
    }

    const tickers = watchlist.map((item) => item.stock_ticker);
    const prices = await fetchStockPrices(tickers);

    ws.send(JSON.stringify({ prices }));
  };

  fetchAndEmitPrices();
  const intervalId = setInterval(fetchAndEmitPrices, 2000);

  ws.on("close", () => {
    clearInterval(intervalId);
  });
});

// ------- Stock Watchlist Endpoints --------------------
app.get("/watchlist", authenticateRequest, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", req.user?.sub);

    if (error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch watchlist", details: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/watchlist", authenticateRequest, async (req, res) => {
  const { ticker } = req.body;

  if (!ticker) {
    return res.status(400).json({ error: "Stock ticker is required" });
  }

  try {
    const { data, error } = await supabase
      .from("watchlist")
      .insert([{ stock_ticker: ticker, user_id: req.user?.sub }]);

    if (error) {
      return res.status(500).json({
        error: "Failed to add item to watchlist",
        details: error.message,
      });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
