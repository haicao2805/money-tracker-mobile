import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { router } from './router';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    router(app);

    const port = process.env.PORT || 3000;
    await app.listen(port);
}
bootstrap();
