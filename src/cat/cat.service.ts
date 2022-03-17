import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from 'src/cat/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  create(cat: Cat) {
    return this.catsRepository.save(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number) {
    return this.catsRepository.findOneOrFail(id);
  }

  async update(id: number, cat: Cat) {
    const __cat = await this.findOne(id);
    return this.catsRepository.update({ id: __cat.id }, cat);
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }

  async existsById(id: number) {
    const count = await this.catsRepository.count({ where: { id: id } });
    return count >= 1;
  }
}
