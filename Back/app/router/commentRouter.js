const express = require('express');

const commentController = require('../controllers/commentController');

const router = express.Router();
/*
router.get('/', commentController.getAllComment);
router.get('/:id', commentController.getOneComment);
router.post('/', commentController.createComment);
router.patch('/', commentController.updateAllComment);
router.patch('/:id', commentController.updateComment);
router.delete('/', commentController.deleteAllComment);*/
router.delete('/:id', commentController.deleteOneComment);

module.exports = router;