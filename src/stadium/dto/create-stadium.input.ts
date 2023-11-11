import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStadiumInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
