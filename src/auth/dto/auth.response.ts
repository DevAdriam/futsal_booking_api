import { Field, ObjectType } from '@nestjs/graphql';
import { UserStatus } from '@prisma/client';
import { UserModel } from 'src/models/user.model';

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

  @Field(() => String, { nullable: true })
  refreshToken: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}
@ObjectType()
export class LoginUserResponse {
  @Field(() => UserModel)
  user: UserModel;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
