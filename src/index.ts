import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in the environment variables.");
}

//constant product x * y = k
//provide same value of assets
let ETH_BALANCE = 100; //price of eth is 3000
let USDT_BALANCE = 350000; //100*3000
const K = ETH_BALANCE * USDT_BALANCE;

app.post("/buy", (req, res) => {
  const quantity = parseFloat(req.body.quantity);
  let updatedETH_BALANCE = ETH_BALANCE - quantity;
  let updatedUSDT_BALANCE = K / updatedETH_BALANCE;
  const paidAmount = updatedUSDT_BALANCE - USDT_BALANCE;

  ETH_BALANCE = updatedETH_BALANCE;
  USDT_BALANCE = updatedUSDT_BALANCE;

  res.json({
    message: `You paid ${paidAmount} USDT for buying ${quantity} ETH`,
  });
});

app.post("/sell", (req, res) => {
  const quantity = parseFloat(req.body.quantity);
  let updatedETH_BALANCE = ETH_BALANCE + quantity;
  let updatedUSDT_BALANCE = (ETH_BALANCE * USDT_BALANCE) / updatedETH_BALANCE;
  const gotAmount = USDT_BALANCE - updatedUSDT_BALANCE;

  ETH_BALANCE = updatedETH_BALANCE;
  USDT_BALANCE = updatedUSDT_BALANCE;

  res.json({
    message: `You got ${gotAmount} USDT for selling ${quantity} ETH`,
  });
});

app.get("/quote", async (req, res) => {
  const crypto = req.query.crypto as string;
  const response = await fetch(
    `https://rest.coinapi.io/v1/exchangerate/${crypto}/USD`,
    {
      headers: {
        "X-CoinAPI-Key": API_KEY,
      },
    }
  );
  const data = await response.json();
  const price = data.rate;

  res.json({
    message: `Current Market Price of ${crypto} is ${price}`,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
