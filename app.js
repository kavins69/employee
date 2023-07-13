require('dotenv').config();
const Koa = require('koa');
const {koaBody}=require('koa-body');
const routes = require('./routes');
const db = require('./model');
const cors = require('@koa/cors');
const logger = require("koa-logger");

const app = new Koa();
// app.use(logger());
// app.use(cors())
db.sequelize.sync({ force: false});
app.use(koaBody());
routes.createRoute(app);


app.listen(process.env.PORT || PORT, () => {
    console.log('Server listening in PORT:%s',process.env.PORT || PORT);
  });

