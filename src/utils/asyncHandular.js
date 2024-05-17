const asyncHandular = (requestHandular) => {
    return(req,res,next) => {
        Promise.resolve(requestHandular(req,res,next)).catch
        ((err) => next(err))
    }
}

export {asyncHandular}
