import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType({ description: 'register user' })
export class RegisterUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
