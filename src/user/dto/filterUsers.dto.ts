import { constant } from './../../core/constant';
import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';

const { defaultCurrentPage, defaultPageSize } = constant.userController;

export class FilterUsersDTO {
    @ApiProperty({ description: 'Name', example: 'ha', nullable: true })
    name: string;

    @ApiProperty({ description: 'Current Page', example: 1, nullable: true })
    currentPage: number;

    @ApiProperty({ description: 'Page size', example: 4, nullable: true })
    pageSize: number;
}

export const vFilterUsersDto = joi.object({
    currentPage: joi.number().failover(defaultCurrentPage).min(0).required(),
    name: joi.string().allow('').failover('').required(),
    pageSize: joi.number().failover(defaultPageSize).min(0).required(),
});
