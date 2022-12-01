const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `http://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:5000';

  debugger;
const PROXY_CONFIG = [
  {
    context: [
      "/api/user",
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,x-custom-header',
      'Access-Control-Allow-Methods': 'PUT,POST,DELETE,GET,GETITEM,OPTIONS',
    }
  }
  ,
  
  
]

module.exports = PROXY_CONFIG;
