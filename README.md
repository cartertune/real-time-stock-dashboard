# Stockbase Application

This application allows users to manage a watchlist of stock tickers and receive real-time stock price updates using a WebSocket connection. The backend is powered by Node.js, Express, Socket.io, and Supabase. The frontend is built with React.

## Features

- User authentication and session management with Supabase
- Real-time stock price updates using Alpha Vantage
- Add, view, and delete stock tickers from the watchlist

## Prerequisites

- Node.js and npm installed
- Supabase account and project
- Alpha Vantage API key for fetching real stock prices

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/stock-watchlist-app.git
cd stockbase

cd server
yarn install
yarn dev


cd ../client
yarn install
yarn start
```
