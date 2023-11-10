import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserModel } from 'src/models/user.model';
import {
  LoginUserInput,
  RegisterUserInput,
  UpdateUserInput,
} from './dto/auth.input';
import {
  LoginUserResponse,
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

  @Mutation(() => UserModel)
  async RegisterUser(@Args('dto') dto: RegisterUserInput) {
    return this.authService.register(dto);
  }

  @Mutation(() => LoginUserResponse)
  async LoginUser(@Args('dto') dto: LoginUserInput) {
    return this.authService.login(dto);
  }

  @Mutation(() => UpdateUserResponse)
  async UpdateUser(@Args('dto') dto: UpdateUserInput) {
    return this.authService.update(dto);
  }
}
