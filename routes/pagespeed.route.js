const express = require('express');
const router = express.Router();
const pagespeed_controller = require('../controllers/pagespeed.controller');

router.post('/create', pagespeed_controller.pagespeed_create);
router.get('/get-pagespeeds/:site', pagespeed_controller.pagespeed_get_site);
// router.get('/get-pagespeeds/:ids', pagespeed_controller.pagespeed_get);
router.post('/create-template', pagespeed_controller.template_create);
router.get('/get-templates/:product/:site', pagespeed_controller.template_get);
router.get('/get-templates', pagespeed_controller.template_get_all);
router.delete('/delete/:id', pagespeed_controller.template_delete);

module.exports = router;
