import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: null })
    name: string;

    @Column({ default: null })
    username: string;

    @Column({ default: null })
    password: string;

    @Column({ default: null })
    email: string;

    @Column({ default: null, unique: true })
    googleId: string;

    @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
    createDate: Date;

    @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
    updateDate: Date;
}
