import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.listen(3000, () => {
  console.log("Server kör på http://localhost:3000");
});