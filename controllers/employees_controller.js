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
        token=jwt.sign(profile,secret);
        payload={
            employee:{
                id : profile.id,
                name : profile.name,
                salary : profile.salary
            }
        }
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
    const {id} =ctx.request.query;
    data = await Profile.findOne({
     where: {
        id : id
    }
});
    if(!data){
        ctx.body=responseHelper.errorResponse({code:ERR_SBEE_0002})
        ctx.response.status=HttpStatusCodes.NOT_FOUND;
        
    }
}

module.exports = {
    getProfile:getProfile,
    createProfile:createProfile,
}