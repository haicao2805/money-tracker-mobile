import { Injectable } from '@nestjs/common';
import { User } from '../core/models';
import { UserRepository } from '../core/repositories';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findUser(field: keyof User, value: any): Promise<User> {
        return await this.userRepository.findOneByField(field, value);
    }

    async findUsers(field: keyof User, value: any): Promise<User[]> {
        return await this.userRepository.findManyByField(field, value);
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async filterUsers(name: string, currentPage: number, pageSize: number): Promise<User[]> {
        return await this.userRepository
            .createQueryBuilder('user')
            .where(`user.name LIKE (:name)`, {
                name: `%${name}%`,
            })
            .skip(currentPage * pageSize)
            .take(pageSize)
            .getMany();
    }
}
