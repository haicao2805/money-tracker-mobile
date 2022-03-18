import { RepositoryService } from 'src/util/repository/repository.service';
import { EntityRepository } from 'typeorm';
import { AccessToken } from './accessToken.entity';

@EntityRepository(AccessToken)
export class AccessTokenRepository extends RepositoryService<AccessToken> {}
