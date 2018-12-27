const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('./api/middleware/cors');
const errorHandling = require('./api/middleware/error-handling')
const fileUpload = require('express-fileupload');

var mongoose = require('mongoose');
var mongoDBConfig = require('./settings/mongodb-config');

const orderRoutes = require('./api/routes/orders');
const accountRoutes = require('./api/routes/account');

mongoose.connect(mongoDBConfig, {
    useNewUrlParser: true
});

app.use(express.static('public'));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }
}));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors);

// Routes handlers
app.use('/api/orders', orderRoutes);
app.use('/api/account', accountRoutes);

errorHandling(app);

module.exports = app;