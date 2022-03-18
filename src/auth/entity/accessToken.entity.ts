import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccessToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    token: string;

    @Column({ nullable: false })
    userId: string;
}
