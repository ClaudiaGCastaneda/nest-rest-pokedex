export const EnvConfiguration = () => ({
    environment : process.env.NODE_ENV || 'dev',
    mongodb : process.env.MONGODB || 'mongodb://mongo:GJrJzSkIXEDMuJpTKJfkddDrvQxvPBrD@centerbeam.proxy.rlwy.net:11110',
    port : process.env.PORT || 3002,
    default_limit : process.env.DEFAULT_LIMIT || 7,


})