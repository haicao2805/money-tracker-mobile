import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
const Config = ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `./config/.env.${process.env.NODE_ENV}`,
});

const DBConfig = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    keepConnectionAlive: true,
    entities: ['dist/**/*.entity.js'],
    extra: { connectionLimit: 1 },
});

@Module({
    imports: [Config, DBConfig, UserModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
    exports: [AppService],
})
export class AppModule {}
