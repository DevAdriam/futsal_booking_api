import { Field, ObjectType } from '@nestjs/graphql';
import { UserStatus } from '@prisma/client';

@ObjectType({ description: 'register user response' })
export class RegisterUserResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  status: UserStatus;
}
