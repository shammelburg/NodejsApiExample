## About

This example service uses many features which a developer will encounter when creating a web service.

-   Node.js
-   Microsoft SQL Server (Ran in Azure)
-   MongoDB (Ran locally)
-   Password Hashing
-   JWT Signing / Verification
-   PDFs with Templates
-   Emails with HTML Templates (Using SendGrid)
-   CORS
-   Error Handling
-   Routes
-   Route Guarding
-   public folder for static files
-   Logging

I've created a 'repo' folder where account.js is using `mssql` and orders.js is using `mongoose`, both use async / await.


## Run

npm start

## IISNode

Ensure UrlRewrite has been installed


## Useful packages

AZURE
 - https://docs.microsoft.com/en-us/javascript/azure/?view=azure-node-latest
 - https://github.com/Azure/azure-storage-node
 - https://github.com/MicrosoftTranslator/Text-Translation-API-V3-NodeJS

SQL
 - https://github.com/tediousjs/node-mssql

PDF
 - https://github.com/bpampuch/pdfmake (server and client)
 - Blog (https://medium.com/@kainikhil/nodejs-how-to-generate-and-properly-serve-pdf-6835737d118e)

CSV
 - https://github.com/adaltas/node-csv

SMTP
 - https://github.com/nodemailer/nodemailer (https://nodemailer.com/about/)
 - https://github.com/yads/nodemailer-express-handlebars (https://handlebarsjs.com/builtin_helpers.html)

FILE UPLOAD
 - https://github.com/richardgirges/express-fileupload

ZIP FILES
 - https://github.com/archiverjs/node-archiver


## Useful Links

 - https://randomkeygen.com/
