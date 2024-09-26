export default (err, req, res, next) => {
     res.status(err.statusCode).json(err)
     next()
}
