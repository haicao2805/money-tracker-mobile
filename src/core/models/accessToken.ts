import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccessToken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    token: string;

    @Column({ nullable: false })
    userId: string;

    @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
    createDate: Date;

    @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
    updateDate: Date;
}
