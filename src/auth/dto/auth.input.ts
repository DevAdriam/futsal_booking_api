import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { USER_ROLE, USER_STATUS } from '@prisma/client';

@InputType({ description: 'register user' })
export class RegisterUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class OtpRequestInput {
  @Field(() => String)
  phone: string;
}

@InputType()
export class OTPVerifyInput {
  @Field(() => String)
  phone: string;

  @Field(() => Number)
  otp: number;
}

@InputType()
export class CreatePasswordInput {
  @Field(() => String)
  phone: string;

  @Field(() => Number)
  otp: number;

  @Field(() => String)
  newPassword: string;
}

@InputType()
export class UpdateUserInput extends PartialType(RegisterUserInput) {
  @Field(() => String)
  id: string;

  @Field(() => String)
  status: USER_STATUS;

  @Field(() => String)
  role: USER_ROLE;
}
