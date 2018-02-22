const router = require('express').Router({ mergeParams: true });
const exampleCtrl = require('../controllers/exampleCtrl');

router.route('/')
  .get(exampleCtrl.get);

module.exports = router

