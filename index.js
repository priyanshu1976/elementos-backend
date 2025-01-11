const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

app.post("/token", (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, "merasecret");

    // Send response
    res.json({ token });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
