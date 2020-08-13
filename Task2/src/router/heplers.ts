export const defaultErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.errors) {
        return res.status(500).json(err.errors[0].message);
    }
    
    return res.status(err.status || 500).json(err.message || "Something bad happend");
}