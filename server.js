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
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      text: message,
    });

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});
// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});