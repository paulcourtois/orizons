const express = require('express');
const jwt = require('../middleware/auth');
const router = express.Router();
const photoController = require('../controllers/photoController');

router.delete('/:photoId', photoController.deleteOnePhoto);

module.exports = router;