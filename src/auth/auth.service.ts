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
  CreatePasswordInput,
  LoginUserInput,
  OTPVerifyInput,
  OtpRequestInput,
  RegisterUserInput,
  UpdateUserInput,
} from './dto/auth.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
        OR: [
          {
            email: dto.email,
          },
          {
            phone: dto.phone,
          },
        ],
      },
    });

    if (userAlrExist) {
      throw new UnauthorizedException('User already Exist');
    }

    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email && dto.email,
          // password:
          //   dto.password && (await bcrypt.hash(dto.password, SALT_ROUNDS)),
          phone: dto.phone && dto.phone,
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

      console.log('found user', findUser);
      console.log(await this.prisma.user.findMany());

      if (!findUser) throw new UnauthorizedException('user not found');
      const otpCode = Math.floor(Math.random() * 900000) + 100000;

      await this.prisma.otp.upsert({
        where: {
          id: findUser.id,
        },
        create: {
          code: otpCode,
          userId: findUser.id,
        },
        update: {
          code: otpCode,
        },
      });

      return {
        otpCode: otpCode,
      };
    } catch (err) {
      throw err;
    }
  }

  async otpValidCheck(code: number, userId: string) {
    const otp = await this.prisma.otp.findUnique({
      where: {
        userId,
      },
    });

    if (+otp.code !== code) {
      throw new HttpException(
        {
          message: 'Wrong OTP Code ',
          devMessage: 'Wrong OTP Code',
        },
        400,
      );
    }

    const sendOtpTime = otp.updatedAt.getTime();
    const verifyOTpTime = new Date().getTime();
    const TimeDifference = verifyOTpTime - sendOtpTime;

    if (TimeDifference >= 60000) {
      await this.prisma.otp.update({
        where: {
          id: otp.id,
        },
        data: {
          isExpired: true,
        },
      });

      throw new HttpException(
        {
          message: 'OTP is Expired',
          devMessage: 'OTP is Expired',
        },
        400,
      );
    }
  }

  async verifyOtp(dto: OTPVerifyInput) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          phone: dto.phone,
          status: 'ACTIVE',
        },
      });

      await this.otpValidCheck(dto.otp, user.id);

      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isUsed: true,
        },
      });

      return updatedUser;
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
      if (!isPwMatch)
        throw new UnauthorizedException('Credentials are not valid');

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
            otp: true,
            isUsed: true,
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

  async updatePassword(dto: CreatePasswordInput) {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: {
          phone: dto.phone,
        },
        include: {
          otp: true,
        },
      });

      if (!findUser)
        throw new HttpException(
          {
            message: 'User does not exist',
            devMessage: 'User does not exist',
          },
          404,
        );

      if (findUser.otp.isExpired && !findUser.otp.isUsed) {
        throw new HttpException(
          {
            message: 'Invalid OTP code',
            devMessage: 'Invalid OTP code',
          },
          400,
        );
      }
      const hashPw: string = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);

      const updatedUser = await this.prisma.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          password: hashPw,
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
