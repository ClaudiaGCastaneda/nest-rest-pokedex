import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object ({
    MONGODB: Joi.string().uri().default('mongodb://mongo:GJrJzSkIXEDMuJpTKJfkddDrvQxvPBrD@centerbeam.proxy.rlwy.net:11110').optional(),
    PORT: Joi.number().default(3000),
    DEFAULT_LIMIT: Joi.number().default(6)
})