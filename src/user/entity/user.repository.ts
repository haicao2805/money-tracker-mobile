import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async findOneByField(field: keyof User, value: any): Promise<User> {
        return await this.findOne({ [`${field}`]: value });
    }

    public async findManyByField(field: keyof User, value: any): Promise<User[]> {
        return await this.find({ [`${field}`]: value });
    }
}
