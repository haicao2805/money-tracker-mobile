import Joi from 'joi';

export class ValidatorService {
    public static joiSchemaGenerator<T>(cb: CallableFunction) {
        function getJoiSchema(field: keyof T): Joi.Schema {
            return cb(field);
        }

        function getJoiSchemas(fields: (keyof T)[]): { [key: string]: Joi.Schema } {
            const schema = {};

            for (const field of fields) {
                schema[`${field}`] = cb(field);
            }

            return schema;
        }
    }
}

export const validatorService = new ValidatorService();
