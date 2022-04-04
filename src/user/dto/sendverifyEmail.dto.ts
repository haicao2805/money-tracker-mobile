import { ApiProperty } from '@nestjs/swagger';

export class SendVerifyEmailDTO {
    @ApiProperty({ description: 'Username', example: 'haicao' })
    email: string;
}
