import { ApiProperty } from '@nestjs/swagger';

export class SendVerifyEmailDTO {
    @ApiProperty({ description: 'Username', example: 'haicao2805@gmail.com' })
    email: string;
}
