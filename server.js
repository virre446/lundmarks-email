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
  try {
    const { to, subject, message } = req.body;

    const safeTo = String(to || "").trim();
    const safeSubject = String(subject || "").trim();
    const safeMessage = String(message || "").trim();

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: safeTo,
      subject: safeSubject,

      html: `
        <p>${safeMessage}</p>
      `,
    });

    res
      .status(200)
      .setHeader("Content-Type", "application/json; charset=utf-8")
      .json({
        success: true,
        data: response,
      });

  } catch (error) {
    res
      .status(500)
      .setHeader("Content-Type", "application/json; charset=utf-8")
      .json({
        success: false,
        error: error.message,
      });
  }
});
// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});