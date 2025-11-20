// src/utils/generateCode.js

// Generates a random short code for shortened URLs
function generateCode(length = 7) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * characters.length);
        result += characters[rand];
    }

    return result;
}

module.exports = generateCode;
