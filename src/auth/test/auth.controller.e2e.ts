import { INestApplication } from '@nestjs/common';
import { UserRepository } from '../../core/repositories';
import { UserService } from '../../user/user.service';
import { initTestModule } from '../../core/test/initTest';
import { AuthService } from '../auth.service';
import { LoginDTO } from '../dto';
import * as supertest from 'supertest';
import { fakeUser } from '../../core/test/helper';

describe('AuthController', () => {
    let app: INestApplication;

    let authService: AuthService;
    let userService: UserService;
    let userRepository: UserRepository;
    beforeAll(async () => {
        const { getApp, module } = await initTestModule();
        app = getApp;

        userRepository = module.get<UserRepository>(UserRepository);

        authService = module.get<AuthService>(AuthService);

        userService = module.get<UserService>(UserService);
    });

    describe('Common Authentication', () => {
        describe('POST /login', () => {
            let loginUserData: LoginDTO;
            const reqApi = (input: LoginDTO) => supertest(app.getHttpServer()).post('/api/auth/login').send(input);

            beforeEach(async () => {
                const getUser = fakeUser();
                loginUserData = {
                    username: getUser.username,
                    password: getUser.password,
                };
                getUser.password = await authService.encryptPassword(getUser.password, 2);
                await userService.saveUser(getUser);
            });

            it('Pass', async () => {
                const res = await reqApi(loginUserData);

                expect(res.body.token).not.toBeNull();
            });

            it('Failed (username is not correct)', async () => {
                loginUserData.username = 'updateaaabbbccc';
                const res = await reqApi(loginUserData);
                expect(res.status).toBe(400);
            });

            it('Failed (password is not correct)', async () => {
                loginUserData.password = '123AABBDASDaa';
                const res = await reqApi(loginUserData);
                expect(res.status).toBe(400);
            });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
