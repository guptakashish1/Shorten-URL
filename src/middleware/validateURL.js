// src/middleware/validateURL.js

function validateURL(req, res, next) {
    const { targetUrl } = req.body;

    if (!targetUrl) {
        return res.status(400).json({ error: "targetUrl is required" });
    }

    try {
        const url = new URL(targetUrl);

        // Allow only HTTP and HTTPS
        if (!["http:", "https:"].includes(url.protocol)) {
            return res.status(400).json({ error: "URL must start with http:// or https://" });
        }

        next(); // URL is valid → move to controller

    } catch (err) {
        return res.status(400).json({ error: "Invalid URL format" });
    }
}

module.exports = validateURL;
