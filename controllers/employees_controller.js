const db = require("../model");
const Profile = db.profile;

const createProfile= async (ctx)=>{
    console.log("enter")
    let data = {};
    const {id , name, salary }= ctx.request.body;
    let profile={
        id,
        name,
        salary
    }
    data = await Profile.create(profile)
     console.log(data)
        ctx.body=data
        ctx.response.status=200;
    }


const getProfile = async (ctx) => {
    console.log("run")
    let data = {};
    const {id} =ctx.request.query;
    // const userId = 1
    data = await Profile.findOne({
     where: {
        id : id
    }
});
    console.log(id)
   console.log(data)
   ctx.query=data
   ctx.response.status=200
}

module.exports = {
    getProfile:getProfile,
    createProfile:createProfile,
}