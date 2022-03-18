import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/ormconfig';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    if (process.env.NODE_ENV === 'production') return TypeOrmModule.forRoot();
    return TypeOrmModule.forRoot(config);
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
