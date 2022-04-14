import { INestApplication } from '@nestjs/common';
import { UserRepository } from '../../core/repositories';
import { UserService } from '../../user/user.service';
import { initTestModule } from '../../core/test/initTest';
import { AuthService } from '../auth.service';
import { LoginDTO, RegisterDTO } from '../dto';
import * as supertest from 'supertest';
import { fakeUser } from '../../core/test/helper';
import { User } from 'src/core/models';
import { StatusCodes } from 'http-status-codes';

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
                    email: getUser.email,
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
                loginUserData.email = 'xxx@gmail.com';
                const res = await reqApi(loginUserData);
                expect(res.status).toBe(400);
            });

            it('Failed (password is not correct)', async () => {
                loginUserData.password = '123AABBDASDaa';
                const res = await reqApi(loginUserData);
                expect(res.status).toBe(400);
            });
        });

        describe('POST /register', () => {
            let registerData: RegisterDTO;
            const reqApi = (input: RegisterDTO) => supertest(app.getHttpServer()).post('/api/auth/register').send(input);
            let getUser: User;
            beforeEach(async () => {
                getUser = fakeUser();
                registerData = {
                    email: getUser.email,
                    password: getUser.password,
                    confirmPassword: getUser.password,
                    name: getUser.name,
                };
            });
            it('Pass', async () => {
                const res = await reqApi(registerData);
                expect(res.body.token).not.toBeNull();
            });
            it('Failed (username taken)', async () => {
                await userService.saveUser(getUser);
                const res = await reqApi(registerData);
                expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
