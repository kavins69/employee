const db = require("../model");
const Profile = db.profile;
const jwt = require("jsonwebtoken")
const _=require("lodash")
const secret =process.env.secret;
const HttpStatusCodes=require("../constants/HttpStatusCode")
const responseHelper=require("../helpers/responseHelper");
const { ERR_SBEE_0002 } = require("../constants/ApplicationErrorConstant");


const createProfile= async (ctx)=>{
    console.log("enter")
    let error=null;
    let responseCode= HttpStatusCodes.SUCCESS;
    let { data, payload ,token } = {};
    const {id , name, salary }= ctx.request.body;
    let profile={
        id,
        name,
        salary
    }
    try{
        data = await Profile.create(profile)
        payload={
                id : profile.id,
                name : profile.name,
                salary : profile.salary
            
        }
    token=jwt.sign(payload,secret);

    }catch(err){
        error=err;
        responseCode= HttpStatusCodes.BAD_REQUEST;
    }
    ctx.body=responseHelper.buildResponse(error,{payload,token});
    ctx.response.status=responseCode;
}
    


const getProfile = async (ctx) => {
    console.log("run")
    let error = null;
    let responseCode = HttpStatusCodes.SUCCESS;
    let { data , payload } = {};
    const id =_.get(ctx.request.employee, "id")
    console.log(id)
    try{
        data = await Profile.findOne({
            raw : true,
            where: {
               id : id
           }
       })
       console.log(data);

    if(!data){
        ctx.body=responseHelper.errorResponse({code:ERR_SBEE_0002})
        ctx.response.status=HttpStatusCodes.NOT_FOUND;
        return;
    }
    payload={
        profile:{
            id : data.id,
            name : data.name,
            salary : data.salary
        }
    }
    ctx.body=responseHelper.buildResponse(error,{payload})
    ctx.response.status=responseCode;
}catch (err) {
    error = err;
    responseCode = HttpStatusCodes.BAD_REQUEST;
}

}

module.exports = {
    getProfile:getProfile,
    createProfile:createProfile,
}