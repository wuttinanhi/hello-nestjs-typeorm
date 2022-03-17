import { INestApplication } from '@nestjs/common';
import { Cat } from 'src/cat/cat.entity';
import { CatService } from 'src/cat/cat.service';

export async function mockData(app: INestApplication) {
  const catService = app.get(CatService);

  const mockExists = await catService.existsById(1);
  if (mockExists === true) return;

  const newCat = new Cat();
  newCat.name = 'CatName1';
  newCat.age = 1;
  newCat.type = 'AAA';

  await catService.create(newCat);
}
