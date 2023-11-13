import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserModel } from 'src/models/user.model';
import {
  CreatePasswordInput,
  LoginUserInput,
  OTPVerifyInput,
  OtpRequestInput,
  RegisterUserInput,
  UpdateUserInput,
} from './dto/auth.input';
import {
  LoginUserResponse,
  OtpResponse,
  RegisterUserResponse,
  UpdateUserResponse,
} from './dto/auth.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => [RegisterUserResponse])
  async getAllUsers(): Promise<RegisterUserResponse[] | []> {
    return this.authService.getAll();
  }

  @Mutation(() => OtpResponse)
  async RequestOtp(
    @Args('otp') otp: OtpRequestInput,
  ): Promise<OtpResponse | string> {
    return this.authService.requestOtp(otp);
  }

  @Mutation(() => RegisterUserResponse)
  async VerifyOTP(@Args('dto') dto: OTPVerifyInput) {
    return this.authService.verifyOtp(dto);
  }

  @Mutation(() => UserModel)
  async RegisterUser(@Args('dto') dto: RegisterUserInput) {
    return this.authService.register(dto);
  }

  @Mutation(() => LoginUserResponse)
  async LoginUser(@Args('dto') dto: LoginUserInput) {
    return this.authService.login(dto);
  }

  @Mutation(() => RegisterUserResponse)
  async passwordCreate(@Args('dto') dto: CreatePasswordInput) {
    return this.authService.createPassword(dto);
  }

  @Mutation(() => UpdateUserResponse)
  async UpdateUser(@Args('dto') dto: UpdateUserInput) {
    return this.authService.update(dto);
  }
}
