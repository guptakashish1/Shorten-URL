const { prisma, testConnection } = require('../config/database');

function generateRandomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function isValidUrl(string) {
  try {
    // Add https:// if missing
    if (!string.startsWith('http://') && !string.startsWith('https://')) {
      string = 'https://' + string;
    }
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

function isValidCode(code) {
  return /^[A-Za-z0-9\-_]{1,8}$/.test(code);
}

class LinkController {
  // GET /api/links
  async getAllLinks(req, res) {
    try {
      console.log('🔍 Fetching all links...');
      
      // Test database connection first
      const isConnected = await testConnection();
      if (!isConnected) {
        return res.status(500).json({ 
          error: 'Database connection failed',
          details: 'Cannot connect to the database'
        });
      }

      const links = await prisma.link.findMany({
        orderBy: { createdAt: 'desc' },
      });
      
      console.log(`✅ Found ${links.length} links`);
      res.json(links);
      
    } catch (error) {
      console.error('❌ Error fetching links:', error);
      
      // More specific error messages
      if (error.message.includes('does not exist')) {
        return res.status(500).json({ 
          error: 'Database table does not exist',
          details: 'Please run: npx prisma db push'
        });
      }
      
      if (error.message.includes('connection')) {
        return res.status(500).json({ 
          error: 'Database connection failed',
          details: error.message
        });
      }
      
      res.status(500).json({ 
        error: 'Failed to fetch links',
        details: error.message
      });
    }
  }

  // POST /api/links
  async createLink(req, res) {
    try {
      console.log('📝 Creating new link with data:', req.body);
      
      let { targetUrl, code } = req.body;

      if (!targetUrl) {
        return res.status(400).json({ error: 'URL is required' });
      }

      // Add protocol if missing
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
      }

      if (!isValidUrl(targetUrl)) {
        return res.status(400).json({ error: 'Valid URL is required' });
      }

      let shortCode = code;
      if (!shortCode) {
        shortCode = generateRandomCode();
        console.log('🎲 Generated random code:', shortCode);
      }

      if (shortCode && !isValidCode(shortCode)) {
        return res.status(400).json({ 
          error: 'Code must be 1-8 characters and contain only letters, numbers, dash, and underscore' 
        });
      }

      // Check if code already exists
      const existingLink = await prisma.link.findUnique({
        where: { code: shortCode },
      });

      if (existingLink) {
        return res.status(409).json({ error: 'Code already exists' });
      }

      console.log('💾 Creating link in database...');
      const link = await prisma.link.create({
        data: {
          code: shortCode,
          targetUrl,
        },
      });

      console.log('✅ Link created successfully:', link);
      res.json(link);
      
    } catch (error) {
      console.error('❌ Error creating link:', error);
      
      // More specific error messages
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Short code already exists' });
      }
      
      if (error.message.includes('does not exist')) {
        return res.status(500).json({ 
          error: 'Database table does not exist',
          details: 'Please run: npx prisma db push'
        });
      }
      
      res.status(500).json({ 
        error: 'Failed to create link',
        details: error.message
      });
    }
  }

  // GET /api/links/:code
  async getLinkStats(req, res) {
    try {
      const { code } = req.params;
      console.log('📊 Fetching stats for code:', code);

      const link = await prisma.link.findUnique({
        where: { code },
      });

      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      res.json(link);
    } catch (error) {
      console.error('❌ Error fetching link stats:', error);
      res.status(500).json({ error: 'Failed to fetch link stats', details: error.message });
    }
  }

  // DELETE /api/links/:code
  async deleteLink(req, res) {
    try {
      const { code } = req.params;
      console.log('🗑️ Deleting link with code:', code);

      const link = await prisma.link.findUnique({
        where: { code },
      });

      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      await prisma.link.delete({
        where: { code },
      });

      console.log('✅ Link deleted successfully');
      res.json({ success: true });
    } catch (error) {
      console.error('❌ Error deleting link:', error);
      res.status(500).json({ error: 'Failed to delete link', details: error.message });
    }
  }
}

module.exports = new LinkController();