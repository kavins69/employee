const Router = require("koa-router");
const employees= require("./employees")
const app = new Router()

app.get("/", (ctx) => {
    ctx.body = "Hi";
  });
  
  module.exports={
    employees
  }