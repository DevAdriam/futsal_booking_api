import { Injectable } from '@nestjs/common';
import { CreateStadiumInput } from './dto/create-stadium.input';
import { UpdateStadiumInput } from './dto/update-stadium.input';

@Injectable()
export class StadiumService {
  create(createStadiumInput: CreateStadiumInput) {
    return 'This action adds a new stadium';
  }

  findAll() {
    return `This action returns all stadium`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stadium`;
  }

  update(id: number, updateStadiumInput: UpdateStadiumInput) {
    return `This action updates a #${id} stadium`;
  }

  remove(id: number) {
    return `This action removes a #${id} stadium`;
  }
}
