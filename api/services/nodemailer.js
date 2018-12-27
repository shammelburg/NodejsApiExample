const nodemailer = require('nodemailer');
const nodemailerOptions = require('../../settings/nodemailer-config');
const mailerhbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport(nodemailerOptions);

transporter.use('compile', mailerhbs({
    viewPath: './api/_assets/email-templates', //Path to email template folder
    extName: '.hbs' //extendtion of email template
}));


exports.sendMail = (user) => {
    var mailOptions = {
        from: '"NodeJS" <sander.hammelburg@nodejs.com>',
        to: [
            user.email
        ],

        subject: 'Sending Email using Node.js',
        //html: body,
        template: 'registration', //Name email file template
        context: { // pass variables to template
            name: user.name,
            list: [{
                age: 33,
                firstName: 'John',
                lastName: 'Doe'
            }, {
                age: 26,
                firstName: 'Jane',
                lastName: 'Doe'
            }]
        },
        // https://nodemailer.com/message/attachments/
        attachments: [{ // utf-8 string as an attachment
                filename: 'text1.txt',
                content: 'hello world!'
            },
            // { // use URL as an attachment
            //     filename: 'test.pdf',
            //     path: 'https://path/to/file.pdf'
            // }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}