import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { CatController } from '../cat/cat.controller';
import { CatModule } from './cat.module';
import { mockData } from '../mock';
import { Cat } from './cat.entity';

describe('CatController', () => {
  let controller: CatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(), CatModule],
      controllers: [CatController],
    }).compile();

    controller = module.get<CatController>(CatController);

    // mock data
    await mockData(module.createNestApplication());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('test cat root', () => {
    expect(controller.index).toBeDefined();
  });

  it('test cat all', async () => {
    expect(controller.all).toBeDefined();
    const result = await controller.all();
    expect(result.length).toEqual(1);
  });

  it('test cat get', async () => {
    expect(controller.get).toBeDefined();

    const getResult = await controller.get(1);

    expect(getResult.id).toEqual(1);
    expect(getResult.name).toEqual('CatName1');
    expect(getResult.type).toEqual('AAA');
    expect(getResult.age).toEqual(1);
  });

  it('test cat update', async () => {
    expect(controller.get).toBeDefined();

    const updateCat = new Cat();
    updateCat.name = 'Update Cat';
    updateCat.type = 'Update Type';
    updateCat.age = 5;

    await controller.update(1, updateCat);

    const getResult = await controller.get(1);

    expect(getResult.id).toEqual(1);
    expect(getResult.name).toEqual('Update Cat');
    expect(getResult.type).toEqual('Update Type');
    expect(getResult.age).toEqual(5);
  });

  it('test cat delete', async () => {
    expect(controller.delete).toBeDefined();

    await controller.delete(1);

    const result = await controller.all();
    expect(result.length).toEqual(0);
  });
});
