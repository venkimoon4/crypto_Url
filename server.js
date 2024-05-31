const express = require("express");
const cors=require('cors');
const app = express();
app.use(cors());

app.use(express.json());

app.post("/getCryptoValueFromCoinGekco", async (req, res) => {
  try {
    const { amount }= req.body;

    try {
      const amtApi = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=inr"
      );
      const data = await amtApi.json();

      let usdtAmount=0;

      if (data && data.tether && data.tether.inr) {
        const usdtRate = data.tether.inr;
         usdtAmount = amount / usdtRate;
      } else {
        throw new Error("Failed to fetch exchange rate.");
      }

      res.status(200).json({data,USDT:Number(usdtAmount.toFixed(4))})
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/getCryptoValueFromCryptoCompare", async (req, res) => {
  try {
    const { amount }= req.body;

    try {
      const amtApi = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=INR"
      );

      const data = await amtApi.json();

      let usdtAmount=0;

      if (data && data.INR) {
        const usdtRate = data.INR;
         usdtAmount = amount / usdtRate;
      } else {
        throw new Error("Failed to fetch exchange rate.");
      }
      res.status(200).json({data,USDT:Number(usdtAmount.toFixed(4))})
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




app.listen(4000, () => {
  console.log("Listening to Port 4000");
});
