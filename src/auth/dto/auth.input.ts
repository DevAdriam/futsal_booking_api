import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'register user' })
export class RegisterInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
