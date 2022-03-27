import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
@Entity()
export class User extends BaseEntity {
    @ApiProperty({ description: 'Id' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Name' })
    @Column({ default: null })
    name: string;

    @ApiProperty({ description: 'Username' })
    @Column({ default: null })
    username: string;

    @ApiHideProperty()
    @Column({ default: null })
    password: string;

    @ApiProperty({ description: 'Email' })
    @Column({ default: null })
    email: string;

    @ApiProperty({ description: 'Google id' })
    @Column({ default: null, unique: true })
    googleId: string;

    @ApiProperty({ description: 'Create date' })
    @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
    createDate: Date;

    @ApiProperty({ description: 'Update date' })
    @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
    updateDate: Date;
}
