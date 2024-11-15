

import Joi, { ObjectSchema } from 'joi';
import { ContactData, RechargeData } from 'protocols';

const phoneSchema =  Joi.object<ContactData> ({
    cpf: Joi.number().required(),
    phoneNumber: Joi.array().items(Joi.number()).required(),
    operator: Joi.string().required(),
    name: Joi.string().required(),
    carrier: Joi.number().required(),
    description: Joi.string().required()
});

const rechargeSchema =  Joi.object<RechargeData> ({
    id: Joi.number().required(),
    phoneNumber_rc: Joi.string().required(),
    recharge: Joi.number().min(10.00).max(1000.00).required()
});

const Schema={
    phoneSchema,
    rechargeSchema
}

export default Schema;

// import joi, { ObjectSchema} from 'joi';
// import { ContactData } from 'protocols';

// const phoneSchema =joi.object<ContactData>({
//     cpf: joi.number().required(),
//     phoneNumber: joi.array().items().min(1).max(3),
//     operator: joi.string().required(),
//     name: joi.string().required(),
//     description: joi.string().required()
// });

// export default phoneSchema;