import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserModel } from 'src/models/user.model';
import { RegisterUserInput } from './dto/auth.input';
import { RegisterUserResponse } from './dto/auth.response';

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

  @Mutation(() => UserModel)
  async UpdateUser(@Args('dto') dto: RegisterUserInput) {
    return '';
  }
}
