import { INestApplication } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import { config } from './config';
import { monoEnum } from 'mono-utils-core';
import helmet from 'helmet';
import * as compression from 'compression';

export function router(app: INestApplication) {
    app.use(cookieParser());
    app.setGlobalPrefix('/api');
    app.enableCors({ origin: config.CLIENT_URL, credentials: true });

    if (config.NODE_ENV === monoEnum.NODE_ENV_MODE.PRODUCTION) {
        app.use(helmet());
        app.use(compression());
    }
    //handle for multiple language
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
        res.header('Access-Control-Allow-Headers', '*');

        next();
    });
}
