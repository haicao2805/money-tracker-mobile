import {
    BadGatewayException,
    BadRequestException,
    InternalServerErrorException,
    UnauthorizedException,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { LocaleService } from '../locale/locale.service';

import { ResponseForDeveloper } from './api.interface';

export type ErrorType =
    | 'BadGatewayException'
    | 'BadRequestException'
    | 'InternalServerErrorException'
    | 'UnauthorizedException'
    | 'NotFoundException'
    | 'ForbiddenException';

class ApiResponse {
    constructor(private readonly localesService: LocaleService) {}

    public sendError<T>(body: ResponseForDeveloper<T>, errorType: ErrorType) {
        const res = this.localesService.translateResponse(body);

        switch (errorType) {
            case 'BadGatewayException':
                return new BadGatewayException(res);
            case 'BadRequestException':
                return new BadRequestException(res);
            case 'InternalServerErrorException':
                return new InternalServerErrorException(res);
            case 'UnauthorizedException':
                return new UnauthorizedException(res);
            case 'NotFoundException':
                return new NotFoundException(res);
            case 'ForbiddenException':
                return new ForbiddenException(res);
        }
    }

    public send<T>(body: ResponseForDeveloper<T>) {
        return this.localesService.translateResponse(body);
    }
}

export const apiResponse = new ApiResponse(new LocaleService());
