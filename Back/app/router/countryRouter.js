const express = require('express');

const countryController = require('../controllers/countryController');

const router = express.Router();

router.get('/', countryController.getAllCountry);

/*
router.get('/:id', countryController.getOneCountry);
router.post('/', countryController.createCountry);
router.patch('/', countryController.updateAllCountry);
router.patch('/:id', countryController.updateCountry);
router.delete('/', countryController.deleteAllCountry);
router.delete('/:id', countryController.deleteOneCountry);
*/
module.exports = router;