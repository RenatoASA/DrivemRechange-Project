

import Joi, { ObjectSchema } from 'joi';
import { ContactData } from 'protocols';

const phoneSchema =  Joi.object<ContactData> ({
    cpf: Joi.number().required(),
    phoneNumber: Joi.array().items(Joi.number()).required(),
    operator: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required()
});

export default phoneSchema;

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