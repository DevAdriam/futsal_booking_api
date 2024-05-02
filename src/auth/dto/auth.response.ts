import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { USER_ROLE, USER_STATUS } from '@prisma/client';
import { otpModel, UserModel } from 'src/models/user.model';

@ObjectType({ description: 'register user response' })
export class RegisterUserResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String)
  role: USER_ROLE;

  @Field(() => otpModel)
  otp: otpModel;

  @Field(() => Boolean)
  isUsed: boolean;

  @Field(() => String)
  status: USER_STATUS;

  @Field(() => String, { nullable: true })
  refreshToken: string;
}

@ObjectType()
export class LoginUserResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

@ObjectType()
export class OtpResponse {
  @Field(() => Number)
  otpCode: number;
}

@ObjectType()
export class UpdateUserResponse extends PartialType(RegisterUserResponse) {}
