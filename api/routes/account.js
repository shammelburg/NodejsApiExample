const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account');
const checkAuth = require('../middleware/check-auth');

router
    .get('/', checkAuth, AccountController.account_get)

    .post('/register', AccountController.account_register)

    .post('/login', AccountController.account_login);

module.exports = router;