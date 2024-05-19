import express from "express";

const app = express();
app.use(express.json());

const API_KEY = " 7B0838AE-0A65-4BE8-8D3F-3E676DAD3C5F";

//constant product x * y = k
//pprovide same value of assets
let ETH_BALANCE = 100; //price of eth is 3000
let USDT_BALANCE = 350000; //100*3000
const K = ETH_BALANCE * USDT_BALANCE;

app.post("/buy", (req, res) => {
  const quantity = req.body.quantity;
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
  const quantity = req.body.quantity;
  const u_quantity = parseInt(quantity);
  let updatedETH_BALANCE = ETH_BALANCE + u_quantity;
  let updatedUSDT_BALANCE = (ETH_BALANCE * USDT_BALANCE) / updatedETH_BALANCE;
  const gotAmount = USDT_BALANCE - updatedUSDT_BALANCE;

  ETH_BALANCE = updatedETH_BALANCE;
  USDT_BALANCE = updatedUSDT_BALANCE;

  res.json({
    message: `You got ${gotAmount} USDT for selling ${quantity} ETH`,
  });
});

app.get("/quote", async (req, res) => {
  const crypto = req.query.crypto;
  const response = await fetch(
    `https://rest.coinapi.io/v1/exchangerate/${crypto}/USD`,
    {
      headers: {
        "X-CoinAPI-Key": API_KEY, // Replace with your API key
      },
    }
  );
  const data = await response.json();
  const price = data.rate;

  res.json({
    message: `Current Market Price of ${crypto} is ${price}`,
  });
});

app.listen(3000);
