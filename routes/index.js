const {koaBody} = require('koa-body');
const api = require('./api');

const createRoute = (app) => {
  Object.keys(api).forEach((version) => {
    Object.keys(api[version]).forEach((key) => {
      api[version][key].use(koaBody());
      app.use(api[version][key].routes());
      app.use(api[version][key].allowedMethods());
    });
  });
};

module.exports = { createRoute };