const express = require('express');
const router = express.Router();
const pagespeed_controller = require('../controllers/pagespeed.controller');

router.post('/create', pagespeed_controller.pagespeed_create);
router.get('/get-pagespeeds/:ids', pagespeed_controller.pagespeed_get);
router.post('/create-template', pagespeed_controller.template_create);
router.get('/get-templates/:product/:site', pagespeed_controller.template_get);
router.get('/get-templates', pagespeed_controller.template_get_all);
router.delete('/delete/:id', pagespeed_controller.template_delete);
// router.put('/:id/update', product_controller.product_update);
module.exports = router;

//cron job for pagespeed
//move data to graph
