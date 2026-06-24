import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// Resend init
const resend = new Resend(process.env.RESEND_API_KEY);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Bot is live 🚀");
});

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});