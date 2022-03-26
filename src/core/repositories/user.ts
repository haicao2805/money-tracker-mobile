import { RepositoryService } from '.';
import { EntityRepository } from 'typeorm';
import { User } from '../models';

@EntityRepository(User)
export class UserRepository extends RepositoryService<User> {}
