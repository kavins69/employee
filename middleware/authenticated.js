const jwt=require("jsonwebtoken")
const _ = require("lodash")
const { ERR_SBEE_0001} = require("../constants/ApplicationErrorConstant")
const db = require("../model")
// const HttpStatusCodes=require("../constants/HttpStatusCode")
// const responseHelper=require("../helpers/responseHelper")
// const profile = db.profile
const secret = process.env.secret

const isEmployee = async (ctx,next) => {
    if(!ctx.headers.authorization){
        ctx.throw(401 , ERR_SBEE_0001);
    }
    const token =ctx.headers.authorization.split(" ")[1];
    console.log(token)
    try{
        ctx.request.employee=jwt.verify(token,secret);
        console.log("token verified", ctx.request.employee)
        await next();
    }
    catch(err){
        ctx.throw(err.status || 401,err.text)
    }
}

module.exports={
    isEmployee:isEmployee
}