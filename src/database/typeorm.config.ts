import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const typeOrmConfig = async (
    config: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
    type: config.get<'mysql'>('DB_TYPE'),
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    entities: [join(__dirname, '/entities/*.entity.{ts,js}')],
    migrations: [join(__dirname, '/migrations/*.{ts,js}')],
    synchronize: false,
    logging: true
});
