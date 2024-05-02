import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'OTP model for user' })
export class otpModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  userId: string;

  @Field(() => String)
  code: number;

  @Field(() => Boolean)
  isExpired: boolean = false;

  @Field(() => Boolean)
  isUsed: boolean = false;
}
@ObjectType({ description: 'user model' })
export class UserModel {
  @Field((type) => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => otpModel)
  otp: otpModel;

  @Field(() => Boolean)
  isUsed: boolean = false;
}
