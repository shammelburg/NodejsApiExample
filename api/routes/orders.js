const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders');
const checkAuth = require('../middleware/check-auth');

router
    .get('/', checkAuth, OrdersController.orders_get)

    .get('/:orderId', OrdersController.orders_get_id)

    .post('/', OrdersController.orders_post)

    .post('/pdf', OrdersController.orders_pdf_post)

    .post('/zip', OrdersController.orders_zip_post)

    .delete('/:orderId', OrdersController.orders_delete_id)

module.exports = router;