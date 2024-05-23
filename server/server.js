const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { supabaseJWT, supabase } = require("./supabaseClient");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, supabaseJWT);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};

app.get("/watchlist", authenticate, async (req, res) => {
  console.log("GET /watchlist", req.headers.authorization, req.user.sub);

  try {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", req.user.sub);

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

app.post("/watchlist", authenticate, async (req, res) => {
  const { ticker } = req.body;

  if (!ticker) {
    return res.status(400).json({ error: "Stock ticker is required" });
  }

  try {
    const { data, error } = await supabase
      .from("watchlist")
      .insert([{ stock_ticker: ticker, user_id: req.user.sub }]);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
