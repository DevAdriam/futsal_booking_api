import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StadiumService } from './stadium.service';
import { Stadium } from './entities/stadium.entity';
import { CreateStadiumInput } from './dto/create-stadium.input';
import { UpdateStadiumInput } from './dto/update-stadium.input';

@Resolver(() => Stadium)
export class StadiumResolver {
  constructor(private readonly stadiumService: StadiumService) {}

  @Mutation(() => Stadium)
  createStadium(@Args('createStadiumInput') createStadiumInput: CreateStadiumInput) {
    return this.stadiumService.create(createStadiumInput);
  }

  @Query(() => [Stadium], { name: 'stadium' })
  findAll() {
    return this.stadiumService.findAll();
  }

  @Query(() => Stadium, { name: 'stadium' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stadiumService.findOne(id);
  }

  @Mutation(() => Stadium)
  updateStadium(@Args('updateStadiumInput') updateStadiumInput: UpdateStadiumInput) {
    return this.stadiumService.update(updateStadiumInput.id, updateStadiumInput);
  }

  @Mutation(() => Stadium)
  removeStadium(@Args('id', { type: () => Int }) id: number) {
    return this.stadiumService.remove(id);
  }
}
