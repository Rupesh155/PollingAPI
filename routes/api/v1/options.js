const express = require('express');
const router = express.Router();

const optionsController = require('../../../controllers/api/v1/options_controller');

router.post('/:id/create', optionsController.createNewOption);
router.get('/:id/add_vote', optionsController.addVote);
router.delete('/:id/delete',optionsController.deleteOption);
module.exports = router;