import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserResponse, RegisterUserResponse } from './dto/auth.response';
import { PrismaService } from 'src/prisma.service';
import {
  LoginUserInput,
  RegisterUserInput,
  UpdateUserInput,
} from './dto/auth.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/models/user.model';

const SALT_ROUNDS = 10;
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
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

  async login(dto: LoginUserInput): Promise<LoginUserResponse> {
    console.log('enter');

    try {
      const { email, password } = dto;

      const isUserExist = await this.prisma.user.findUnique({
        where: {
          status: 'ACTIVE',
          email: email,
        },
      });

      const isPwMatch = await bcrypt.compare(password, isUserExist.password);
      if (!isPwMatch) throw new UnauthorizedException('Credentials not valid');

      const tokens: { accessToken: string; refreshToken: string } =
        await this.generateTokens({
          id: isUserExist.id,
          email: isUserExist.email,
        });

      const updateUser = await this.prisma.user.update({
        where: {
          id: isUserExist.id,
        },
        data: {
          status: 'ACTIVE',
          refreshToken: tokens?.refreshToken,
        },
      });

      return {
        user: updateUser,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
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
            role: true,
            status: true,
            id: true,
            refreshToken: true,
          },
        });

      console.log(allActiveUsers);
      return allActiveUsers;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateUserInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) throw new NotFoundException('User not found');

      const updatedUser = await this.prisma.user.update({
        where: {
          email: dto.email,
        },
        data: {
          email: dto.email,
          username: dto.username,
          status: dto.status,
          role: dto.role,
        },
      });

      return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  private async generateTokens({
    id,
    email,
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: { id: string; email: string } = { id, email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(
      { id: id },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }
}
