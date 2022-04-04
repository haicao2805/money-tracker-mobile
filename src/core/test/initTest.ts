import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { router } from '../router';

export const initTestModule = async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    const configModule = module.createNestApplication();
    //apply middleware
    router(configModule);
    const getApp = await configModule.init();

    //create a fake user and token

    return {
        getApp,
        module,
        configModule,
    };
};
