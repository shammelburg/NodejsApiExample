module.exports = (req, res, next) => {
    
    // http://localhost:3000
    res.header('Access-Control-Allow-Origin', '*');

    // Origin, X-Requested-With, Content-Type, Accept, Authorization
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        // PUT, POST, GET, DELETE, PATCH
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }

    next();
};