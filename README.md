# Bitly - Link Shortening Website

[![Deployed on Railway](https://railway.app/button.svg)](https://railway.app)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue.svg)](https://postgresql.org)

## 🚀 Live Demo
**Live Application:** [your-app-name.railway.app](https://your-app-name.railway.app)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to Bitly, a link shortening website built using Node.js, Express.js, and PostgreSQL. This project allows users to shorten long URLs into more manageable and shareable links. Whether you want to share a link on social media, in an email, or in a text message, Bitly makes it easy.

## Features

- ✅ Shorten long URLs into short, easy-to-share links
- ✅ Customizable short link aliases
- ✅ View detailed analytics for each shortened link, including click statistics
- ✅ User account system for link management
- ✅ Secure and scalable architecture
- ✅ RESTful API for programmatic link shortening and retrieval
- ✅ Mobile-friendly web interface
- ✅ PostgreSQL database with Prisma ORM

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v14 or later)
- PostgreSQL database
- Git (optional but recommended for version control)

## Installation

Follow these steps to set up the Bitly Clone project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/bitly-clone.git
   cd bitly-clone
   npm install
   npx prisma generate
npx prisma db push --force-reset
DATABASE_URL="postgresql://username:password@localhost:5432/bitly_db"
PORT=3000
NODE_ENV="development"

  ```bash
    npm start
  ```
Access the application:

Web Interface: Visit http://localhost:3000 in your browser

API Status: http://localhost:3000/status

Get All Links: http://localhost:3000/api/links

Visit http://localhost:3000 in your web browser to access the web interface.

API Documentation
Endpoints
GET / - Home page

GET /status - Health check

GET /api/links - Get all shortened links

POST /api/links - Create a new shortened link

GET /:shortCode - Redirect to original URL

```bash```
# Create a short link
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://example.com/very-long-url"}'

# Redirect using short code
curl http://localhost:3000/abc123


Deployment
This project is deployed on Railway with automatic CI/CD:

Deployment Status: ✅ Active
Platform: Railway
Database: PostgreSQL
CI/CD: Automatic deployments from GitHub

Deployment Pipeline:
Push to main branch

Automatic build on Railway

Database migrations run automatically

Application deployed to production

Environment Variables (Production):
DATABASE_URL - Railway PostgreSQL connection string

PORT - Automatically set by Railway

NODE_ENV - Production

## Contributing
Contributions are welcome! To contribute to this project, follow these steps:

## Fork the repository.
Create a new branch for your feature or bug fix: git checkout -b feature-name.
Make your changes and commit them: git commit -m "Description of changes".
Push your branch to your forked repository: git push origin feature-name.
Create a pull request to the main repository.
Please follow the contribution guidelines for more details.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


## Key improvements made:

1. **Added badges** for deployment platform and technologies
2. **Live demo section** at the top
3. **Better formatting** with emojis and clear sections
4. **Deployment section** showing your Railway setup
5. **Detailed API documentation** with examples
6. **Clear environment variables** section
7. **Improved installation steps** with Prisma commands

**Don't forget to:**
- Replace `your-app-name.railway.app` with your actual Railway URL
- Replace `https://github.com/yourusername/bitly-clone.git` with your actual GitHub repo URL
- Add your actual live application URL from Railway dashboard

This README now properly showcases your deployed application!

