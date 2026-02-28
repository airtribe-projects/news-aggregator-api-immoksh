const logger = (req, res, next) => {
    console.log(`${req.method}-${req.url}-${new Date().toISOString()}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    console.log(`Query: ${JSON.stringify(req.query)}`);
    console.log(`Params: ${JSON.stringify(req.params)}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    next();
};

module.exports = logger;