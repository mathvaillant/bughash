const stringifyDescription = (req, res, next) => {
    if(Boolean(req.body.description)) {
        req.body.description = JSON.stringify(req.body.description);
    }
    next();
};

module.exports = {
    stringifyDescription
};