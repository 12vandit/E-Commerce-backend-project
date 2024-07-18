module.exports.sendResponse = (res,statusCode,msg,data)=>{
    try {
        res.status(statusCode);
        return res.send({
            statusCode:statusCode,
            message:msg,
            data
        })
    } catch {
        res.status(statusCode);
        return res.send({
            statusCode:statusCode,
            message:msg,
            data
        })
    }
}