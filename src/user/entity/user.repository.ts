import { RepositoryService } from 'src/util/repository/repository.service';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends RepositoryService<User> {}
