"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
app.listen(3000);
