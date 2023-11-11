import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Stadium {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
