// src/models/linkModel.js

const db = require("../config/db");

// Create a new short link
const createLink = async (code, original_url) => {
    const query = `
        INSERT INTO links (code, original_url)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [code, original_url];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Check if a short code already exists
const findByCode = async (code) => {
    const query = `
        SELECT * FROM links
        WHERE code = $1;
    `;
    const result = await db.query(query, [code]);
    return result.rows[0];
};

// Increment click count and update last_clicked
const incrementClicks = async (code) => {
    const query = `
        UPDATE links
        SET clicks = clicks + 1,
            last_clicked = NOW()
        WHERE code = $1
        RETURNING *;
    `;
    const result = await db.query(query, [code]);
    return result.rows[0];
};

// Get analytics for one short code
const getAnalytics = async (code) => {
    const query = `
        SELECT code, original_url, clicks, created_at, last_clicked
        FROM links
        WHERE code = $1;
    `;
    const result = await db.query(query, [code]);
    return result.rows[0];
};

module.exports = {
    createLink,
    findByCode,
    incrementClicks,
    getAnalytics,
};
