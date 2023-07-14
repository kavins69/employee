const { v1 }=require('../../../constants/router_constants')
const {getProfile, createProfile} = require('../../../controllers/employees_controller');
const Router = require("koa-router");
const router = new Router({ prefix: v1.profile });
const isEmployee=require("../../../middleware/authenticated")


router.get("/display",isEmployee,getProfile);



router.post("/create", createProfile);



module.exports = router;