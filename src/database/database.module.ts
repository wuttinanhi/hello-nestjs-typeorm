import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    if (process.env.NODE_ENV === 'production') return TypeOrmModule.forRoot();

    // mysql
    return TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: 'mysqlpassword',
      database: 'nest',
      port: 3306,
      autoLoadEntities: true,
      synchronize: true,
    });

    // sqlite file
    // return TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: './app.db',
    //   autoLoadEntities: true,
    //   keepConnectionAlive: true,
    //   synchronize: true,
    // });
  }

  static forTest(): DynamicModule {
    // in-memory sqlite for testing
    return TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      autoLoadEntities: true,
      keepConnectionAlive: true,
      synchronize: true,
      dropSchema: true,
    });
  }
}
