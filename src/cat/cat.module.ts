import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatController } from './cat.controller';
import { Cat } from 'src/cat/cat.entity';
import { CatService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService, TypeOrmModule],
})
export class CatModule {}
