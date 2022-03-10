import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DatabaseModule } from './database/database.module';
import { ExceptionModule } from './exception/exception.module';

@Module({
  imports: [CatModule, DatabaseModule.forRoot(), ExceptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
