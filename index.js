const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

const jwtsecret = "elementos";

app.post("/", (req, res) => {
  console.log("endpoint hit");
  res.json({
    message: "hello",
  });
});

app.post("/api/token", (req, res) => {
  try {
    console.log(req.body);
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Generate a JWT token using the secret
    const token = jwt.sign({ email }, jwtsecret);

    // Send response
    res.json({ token });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post("/api/verify", (req, res) => {
  try {
    console.log(req.body);
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    // Verify the JWT token using the secret
    jwt.verify(token, jwtsecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      // Send response with decoded data
      res.json({ message: "Token is valid", data: decoded });
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
