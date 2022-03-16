import { Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema, ValidationError } from 'joi';
import { apiResponse } from '../../app/interface/apiResponse';

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
        if (!input) throw apiResponse.sendError({ data: null, details: { errorMessage: { type: 'error.invalid-input' } } }, 'BadRequestException');
        /**
         *  abortEarly:false ==> return all error
         *  abortEarly:true  ==> return the first error
         */
        const { error, value } = this.schema.validate(input, { abortEarly: false });
        if (error) throw apiResponse.sendError({ data: null, details: this.mapJoiError(error) }, 'BadRequestException');

        return value;
    }
}
