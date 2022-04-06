import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';
import { userValidateSchema } from '../../core/models';
export class UpdateNameDTO {
    @ApiProperty({ description: 'Name', example: 'Duc Dauuu' })
    value: string;
}

export const vUpdateNameDTO = joi.object<UpdateNameDTO>({
    value: userValidateSchema.name,
});
