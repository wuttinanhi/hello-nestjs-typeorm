import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    if (process.env.NODE_ENV === 'production') return TypeOrmModule.forRoot();

    return TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './app.db',
      autoLoadEntities: true,
      keepConnectionAlive: true,
      synchronize: true,
    });
  }
}
