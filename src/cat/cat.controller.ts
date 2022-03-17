import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCatDto } from './cat.dto';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get('/')
  public index() {
    return 'Hello cat route!';
  }

  @Post('/create')
  public create(@Body() createCatDto: CreateCatDto) {
    const cat = new Cat();
    cat.name = createCatDto.name;
    cat.age = createCatDto.age;
    cat.type = createCatDto.type;
    return this.catService.create(cat);
  }

  @Get('/all')
  public all() {
    return this.catService.findAll();
  }

  @Get('/get/:id')
  public get(@Param('id') id: number) {
    return this.catService.findOne(id);
  }

  @Patch('/update/:id')
  public async update(@Param('id') id: number, @Body() cat: Cat) {
    await this.catService.update(id, cat);
    return true;
  }

  @Delete('/delete/:id')
  public async delete(@Param('id') id: number) {
    await this.catService.remove(id);
    return true;
  }
}
