import { RepositoryService } from '.';
import { EntityRepository } from 'typeorm';
import { AccessToken } from '../models/accessToken';

@EntityRepository(AccessToken)
export class AccessTokenRepository extends RepositoryService<AccessToken> {}
