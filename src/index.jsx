// index.js

require("dotenv").config();
const express = require("express");
// const app = express();
const linkRoutes = require("./routes/linkRoutes");
const { redirectToURL } = require("./controllers/linkController");
const db = require("./config/database");

app.use(express.json());

// Health check
app.get("/healthz", (req, res) => {
    res.json({
        ok: true,
        version: "1.0",
        uptime: process.uptime(),
        time: new Date(),
    });
});

// API routes
app.use("/api/links", linkRoutes);

// Redirect handler MUST be last
app.get("/:code", redirectToURL);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await db.connect();
        console.log("Connected to PostgreSQL");
    } catch (err) {
        console.error("Database connection failed:", err);
    }

    console.log(`Server running on port ${PORT}`);
});
