import { ConfigModule, ConfigType, registerAs } from '@nestjs/config';
import { DATA_SOURCE } from '@common/constants/repository.tokens';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const databaseConfig = registerAs(
    'database.config',
    (): MysqlConnectionOptions => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
    }),
);

const databaseProviders = [
    {
        provide: DATA_SOURCE,
        inject: [databaseConfig.KEY],
        useFactory: async (databaseConfigKey: ConfigType<typeof databaseConfig>) => {
            const dataSource = new DataSource(databaseConfigKey);
            return dataSource.initialize();
        },
    },
];

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.local'],
            isGlobal: true,
            load: [databaseConfig],
        }),
    ],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
