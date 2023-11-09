import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Query } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
}
