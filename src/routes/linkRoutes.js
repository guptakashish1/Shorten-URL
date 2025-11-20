const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// GET /api/links - Get all links
router.get('/', linkController.getAllLinks);

// POST /api/links - Create new link
router.post('/', linkController.createLink);

// GET /api/links/:code - Get link stats
router.get('/:code', linkController.getLinkStats);

// DELETE /api/links/:code - Delete link
router.delete('/:code', linkController.deleteLink);

module.exports = router;