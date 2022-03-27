import { INestApplication } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as I18n from 'i18n';

// I18n.configure({
//     locales: ['vi', 'en'],
//     directory: './src/core/locale/dictionary',
//     defaultLocale: 'en',
//     cookie: 'lang',
//     missingKeyFn: (locale, value) => {
//         console.log(locale);
//         console.log(value);
//         return value;
//     },
// });

export function router(app: INestApplication) {
    // app.use(I18n.init);
    app.use(cookieParser());
    app.setGlobalPrefix('/api');
    app.enableCors({ origin: 'http://localhost:4000', credentials: true });

    const configSwagger = new DocumentBuilder()
        .setTitle('mono-nestjs-kit')
        .setDescription('The APIs for mono-nestjs-kit')
        .setVersion('1.0')
        .addBearerAuth({ name: 'Authentication', bearerFormat: 'Bearer', scheme: 'Bearer', in: 'Header', type: 'http' })
        .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api/explorer', app, document);

    //handle for multiple language
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
        res.header('Access-Control-Allow-Headers', '*');

        // const lang = req.cookies['lang'] || '';
        // if (!lang) {
        //     I18n.setLocale('en');
        //     res.cookie('lang', 'en', { maxAge: 60 * 60 * 24 * 30 }); // 30 days
        // } else I18n.setLocale(lang);

        next();
    });
}
