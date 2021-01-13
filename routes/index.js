const express = require('express');
const router = express.Router();
const entity = require('../controllers/entity');

router.get('/', function (req, res, next) {
  res.status(200).json({});
});

router.route('/entities')
  .get(entity.getAllEntities)
  .post(entity.createEntity)

module.exports = router;