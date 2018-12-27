const path = require('path');
const pdfMakePrinter = require('pdfmake/src/printer');

const OrdersRepo = require('../repos/orders');
const examplePdf = require('../_assets/pdf-templates/example');
const archiver = require('../services/archiver');

exports.orders_get = async (req, res, next) => {
    try {
        let result = await OrdersRepo.spGetUsers();
        res.status(200).json(result.recordset);
    } catch (err) {
        next(err);
    }
}

exports.orders_get_id = async (req, res, next) => {
    try {
        let result = await OrdersRepo.spGetAllProducts(req.params.orderId);
        res.status(200).json(result.recordset);
    } catch (err) {
        next(err);
    }
}

exports.orders_post = (req, res, next) => {
    try {
        const order = {
            productId: req.body.productId,
            quantity: req.body.quantity
        }

        console.log(req.body)

        if (req.body.hasFile == 'true') {
            if (!req.files) {
                let error = new Error('No files were uploaded.');
                error.status = 400;
                throw error;
            }

            res.status(201).json({
                message: 'POST Orders!!!',
                order: order,
                file: req.files.file.name,
                env: process.env
            })
        } else {
            res.status(201).json({
                message: 'POST Orders!!!',
                order: order,
                file: '',
                env: process.env
            })
        }
    } catch (error) {
        next(error);
    }
}

exports.orders_pdf_post = (req, res, next) => {
    try {
        console.log(req.body)
        var dd = examplePdf(req.body.title);

        createPdfBinary(dd, function (binary) {
            res.contentType('application/pdf');
            res.send(binary);
        }, function (error) {
            res.send('ERROR:' + error);
        });
    } catch (error) {
        next(error);
    }
}

exports.orders_zip_post = (req, res, next) => {
    try {
        let fileName = 'test.zip';

        let files = [
            //'https://path/to/file.pdf'
        ]

        archiver.zip(res, files, fileName);

    } catch (error) {
        next(error);
    }
}


exports.orders_delete_id = (req, res, next) => {
    res.status(200).json({
        message: 'DELETE ' + req.params.orderId
    })
}

// move to own module
function createPdfBinary(pdfDoc, callback) {
    var fontDescriptors = {
        Roboto: {
            normal: path.join(__dirname, '..', '_assets', '/pdf-templates/fonts/Roboto-Regular.ttf'),
            bold: path.join(__dirname, '..', '_assets', '/pdf-templates/fonts/Roboto-Medium.ttf'),
            italics: path.join(__dirname, '..', '_assets', '/pdf-templates/fonts/Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname, '..', '_assets', '/pdf-templates/fonts/Roboto-MediumItalic.ttf')
        }
    };

    var printer = new pdfMakePrinter(fontDescriptors);

    var doc = printer.createPdfKitDocument(pdfDoc);

    var chunks = [];
    var result;

    doc.on('data', function (chunk) {
        chunks.push(chunk);
    });
    doc.on('end', function () {
        result = Buffer.concat(chunks);
        // return PDF to the browsers
        callback(result);
        // return PDF as Base64 string
        //callback('data:application/pdf;base64,' + result.toString('base64'));
    });
    doc.end();
}