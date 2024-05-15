const asyncHandular = (requestHandular) => {
    (req,res,next) => {
        Promise.resolve(requestHandular(req,res,next)).catch((error) => next(err))
    }
}

export {asyncHandular}
