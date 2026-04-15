const express = require("express");
const cors = require("cors");
const { Novu } = require("@novu/node");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const novu = new Novu(process.env.NOVU_API_KEY); 

app.get("/", (req, res) => {
  res.json({ status: "Ragul App API is running!" });
});

app.post("/signup", async (req, res) => {
  const { name, email, phone } = req.body;

  const user = { id: Date.now(), name, email, phone };

  try {
    await novu.trigger("user-signup-notification", {
      to: {
        subscriberId: user.id.toString(),
        email: user.email,
        firstName: user.name,
        phone: user.phone,
      },
      payload: { name: user.name },
    });

    res.json({ message: `Signup successful! Email & SMS sent.` });
  } catch (err) {
    console.error("Novu error:", err);
    res.status(500).json({ message: "Signup failed. Try again." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));