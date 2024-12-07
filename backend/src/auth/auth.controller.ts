import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { SigninDTO } from './dto/signin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async signup(@Body() body: SignupDTO) {
    try {
      this.logger.log(
        `Received signup request with body: ${JSON.stringify(body)}`,
      );
      const jwtToken = await this.authService.signup(body);
      this.logger.log(`User successfully created with token: ${jwtToken}`);

      return {
        message: 'User created successfully',
        data: {
          jwtToken,
        },
      };
    } catch (error) {
      throw error;
    }
  }
  @Post('signin')
  @HttpCode(200)
  async signin(@Body() body: SigninDTO) {
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

      return {
        message: 'User signed in successfully',
        data: {
          jwtToken,
        },
      };
    } catch (error) {
      this.logger.error(
        `Error during signin for email ${body.email}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
