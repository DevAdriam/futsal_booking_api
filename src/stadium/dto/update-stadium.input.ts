import { CreateStadiumInput } from './create-stadium.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStadiumInput extends PartialType(CreateStadiumInput) {
  @Field(() => Int)
  id: number;
}
