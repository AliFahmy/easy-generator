import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { SigninDTO } from './dto/signin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async signup(@Body() body: SignupDTO, @Res() res: Response) {
    try {
      this.logger.log(
        `Received signup request with body: ${JSON.stringify(body)}`,
      );
      const jwtToken = await this.authService.signup(body);
      this.logger.log(`User successfully created with token: ${jwtToken}`);
      res
        .cookie('authToken', jwtToken, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ message: 'User created successfully' });
    } catch (error) {
      throw error;
    }
  }
  @Post('signin')
  @HttpCode(200)
  async signin(@Body() body: SigninDTO, @Res() res: Response) {
    try {
      this.logger.log(`Processing signin request for email: ${body.email}`);

      const jwtToken = await this.authService.signin(body);

      if (jwtToken) {
        this.logger.log(
          `Signin successful: JWT token created for email ${body.email}`,
        );
      } else {
        this.logger.warn(
          `Signin failed: No token generated for email ${body.email}`,
        );
      }

      res
        .cookie('authToken', jwtToken, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ message: 'User signed in successfully' });
    } catch (error) {
      this.logger.error(
        `Error during signin for email ${body.email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res() res: Response) {
    try {
      res.clearCookie('authToken', {
        httpOnly: true,
        sameSite: 'strict',
      });
      res.status(200).send({
        message: 'User logged out successfully',
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('validate-token')
  async validateToken(@Req() req: Request, @Res() res: Response) {
    try {
      const token =
        req.cookies['authToken'] || req.headers['authorization']?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token is required');
      }

      await this.authService.validateToken(token);
      res.status(200).send({
        message: 'Valid token',
      });
      return;
    } catch (error) {
      res.clearCookie('authToken', {
        httpOnly: true,
        sameSite: 'strict',
      });
      res.status(401).send({
        message: 'Invalid token',
      });
    }
  }
}
