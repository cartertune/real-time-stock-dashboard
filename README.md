# Stockbase Application

This application allows users to manage a watchlist of stock tickers and receive real-time stock price updates using a WebSocket connection. The backend is powered by Node.js, Express, Socket.io, and Supabase. The front end is built with React.

## Features

- User authentication and session management with Supabase
- Real-time stock price updates using Finnhub
- Add, view, and delete stock tickers from the watchlist

## Prerequisites

- Node.js and yarn installed

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/cartertune/stockbase.git
cd stockbase
```

### 2. Run the application

I included .env variables in the repo, so it should work without needing to add them

```bash
cd server
yarn install
yarn dev
```
[open new tab]

```bash
cd ../client
yarn install
yarn start
```

The server should be running on port 8080.
[The client should be running on port 3000.
](http://localhost:3000/)


You can use the following accounts to login:
test@test.com (some prefilled data)
test1@test.com
test2@test.com
test3@test.com

all have password: "password"
