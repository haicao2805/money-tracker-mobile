import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, ValidationError } from 'joi';
// import { apiResponse } from '../interface/apiResponse';

@Injectable()
export class JoiValidatorPipe implements PipeTransform {
    constructor(private readonly schema: ObjectSchema) {}

    private mapJoiError(error: ValidationError) {
        const errorObj = {};
        for (const item of error.details)
            errorObj[item.context.key] = {
                type: item.type,
                context: item.context,
            };
        return errorObj;
    }

    transform(input: any) {
        if (!input) throw new HttpException({ errorMessage: 'error.invalid-input' }, StatusCodes.BAD_REQUEST);

        const { error, value } = this.schema.validate(input, { abortEarly: false }); // abortEarly: FALSE => return all error, TRUE: return the first error
        if (error) throw new HttpException({ errorMessage: 'error.invalid-input', details: this.mapJoiError(error) }, StatusCodes.BAD_REQUEST);

        return value;
    }
}
