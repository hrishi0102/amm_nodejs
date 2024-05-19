"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
app.get("/quote", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const crypto = req.query.crypto;
    const response = yield fetch(`https://rest.coinapi.io/v1/exchangerate/${crypto}/USD`, {
        headers: {
            "X-CoinAPI-Key": API_KEY, // Replace with your API key
        },
    });
    const data = yield response.json();
    const price = data.rate;
    res.json({
        message: `Current Market Price of ${crypto} is ${price}`,
    });
}));
app.listen(3000);
