import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function generateConfig(): TypeOrmModuleOptions {
  // sqlite file
  // return TypeOrmModule.forRoot({
  //   type: 'sqlite',
  //   database: './app.db',
  //   autoLoadEntities: true,
  //   keepConnectionAlive: true,
  //   synchronize: true,
  // });

  return {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'mysqlpassword',
    database: 'nest',
    cli: {
      migrationsDir: 'src/migration',
    },
    synchronize: false,
    autoLoadEntities: false,
    migrationsRun: true,
    entities: [__dirname + '/../src/**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../src/migration/*.{js,ts}'],
  };
}

export const config: TypeOrmModuleOptions = { ...generateConfig() };
