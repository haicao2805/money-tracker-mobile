import { RepositoryService } from 'src/util/repository/repository.service';
import { EntityRepository } from 'typeorm';
import { AccessToken } from './accessToken';

@EntityRepository(AccessToken)
export class AccessTokenRepository extends RepositoryService<AccessToken> {}
