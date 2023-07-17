const router = require('express').Router();

router.use('/address', require('./addressRoutes'));

module.exports = router;
