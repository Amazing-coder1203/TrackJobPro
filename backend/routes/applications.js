const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Add a new application
router.post('/', async (req, res) => { /* handle insert */ });

// Edit an application
router.put('/:id', async (req, res) => { /* handle update */ });

// Delete an application
router.delete('/:id', async (req, res) => { /* handle delete */ });

// List applications
router.get('/', async (req, res) => { /* handle select all */ });

module.exports = router;
