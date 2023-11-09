import { Field, ID } from '@nestjs/graphql';

export class User {
  @Field((type) => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => Number)
  phone: number;
}
