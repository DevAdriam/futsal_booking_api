import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserResponse } from './dto/auth.response';
import { PrismaService } from 'src/prisma.service';
import { RegisterUserInput } from './dto/auth.input';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(dto: RegisterUserInput) {
    const userAlrExist = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (userAlrExist) {
      throw new UnauthorizedException('User already Exist');
    }

    try {
      const { username, email, password } = dto;
      if (!username || !email || !password) throw new BadRequestException();

      const hashPw = await bcrypt.hash(password, SALT_ROUNDS);
      console.log(hashPw);
      const newUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: hashPw,
        },
      });

      return newUser;
    } catch (err) {
      throw err;
    }
  }

  async getAll(): Promise<RegisterUserResponse[] | []> {
    try {
      const allActiveUsers: RegisterUserResponse[] | [] =
        await this.prisma.user.findMany({
          where: {
            status: {
              notIn: ['OFFLINE', 'SUSPENDED'],
            },
          },
          select: {
            email: true,
            username: true,
            status: true,
            id: true,
          },
        });

      console.log(allActiveUsers);
      return allActiveUsers;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: RegisterUserInput) {}
}
