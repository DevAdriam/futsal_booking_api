import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginUserResponse,
  OtpResponse,
  RegisterUserResponse,
} from './dto/auth.response';
import { PrismaService } from 'src/prisma.service';
import {
  LoginUserInput,
  OtpRequestInput,
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
      const { username, email, password, phone } = dto;
      if (!username || !email || !password || !phone)
        throw new BadRequestException();

      const hashPw = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: hashPw,
          phone: dto.phone,
          otp: 123456,
          isUsed: true,
        },
      });

      return newUser;
    } catch (err) {
      throw err;
    }
  }

  async requestOtp(dto: OtpRequestInput): Promise<OtpResponse> {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: {
          phone: dto.phone,
        },
      });

      if (!findUser) throw new UnauthorizedException('user not found');
      const otpCode = Math.floor(Math.random() * 90000) + 10000;

      return {
        otpCode: otpCode,
      };
    } catch (err) {
      throw err;
    }
  }

  async login(dto: LoginUserInput): Promise<LoginUserResponse> {
    try {
      const { email, password, phone } = dto;

      const isUserExist = await this.prisma.user.findFirst({
        where: {
          AND: [
            {
              status: 'ACTIVE',
            },
          ],
          OR: [
            {
              phone: phone,
            },
            {
              email: email,
            },
          ],
        },
      });

      if (!isUserExist) throw new UnauthorizedException('wrong credentials');

      //check credentials
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

  async logOut(userId: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          id: userId,
        },
      });

      if (!user) throw new UnauthorizedException('wrong user!');

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: null,
        },
      });

      return;
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
            phone: true,
            role: true,
            status: true,
            id: true,
            refreshToken: true,
          },
        });

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
