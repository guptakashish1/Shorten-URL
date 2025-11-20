const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import database connection test
const { testConnection } = require('./config/database');

// Import routes
const linkRoutes = require('./routes/linkRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));

// API Routes
app.use('/api/links', linkRoutes);
app.use('/healthz', healthRoutes);

// Frontend routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

app.get('/stats/:code', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

// Redirect route - MUST be last
app.get('/:code', async (req, res) => {
    try {
        const { prisma } = require('./config/database');
        const { code } = req.params;

        // Skip common routes
        if (['api', 'css', 'js', 'stats', 'healthz'].includes(code)) {
            return res.status(404).send('Not found');
        }

        const link = await prisma.link.findUnique({
            where: { code },
        });

        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        // Update click count
        await prisma.link.update({
            where: { code },
            data: {
                clicks: link.clicks + 1,
                lastClicked: new Date(),
            },
        });

        res.redirect(302, link.targetUrl);
    } catch (error) {
        console.error('Redirect error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;

// Start server with PostgreSQL connection check
async function startServer() {
    console.log('🔧 Starting server with PostgreSQL...');
    console.log('📊 Database:', process.env.DATABASE_URL.includes('neon') ? 'Neon PostgreSQL' : 'Local PostgreSQL');
    
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
        console.log('❌ Server starting without database connection');
        console.log('💡 Please check your PostgreSQL configuration');
    } else {
        console.log('✅ Database ready');
    }
    
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📍 Visit: http://localhost:${PORT}`);
        console.log(`🔗 API: http://localhost:${PORT}/api/links`);
    });
}

startServer();
