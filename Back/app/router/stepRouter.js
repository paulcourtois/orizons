const express = require('express');

const stepController = require('../controllers/stepController');

const router = express.Router();

router.get('/', stepController.getAllStep);
//router.get('/:stepId', stepController.getOneStep);
router.post('/', stepController.createStep);
// router.patch('/', stepController.updateAllStep);
// router.patch('/:stepId', stepController.updateStep);
// router.delete('/', stepController.deleteAllStep);
router.delete('/:stepId', stepController.deleteOneStep);

module.exports = router;