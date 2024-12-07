import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDTO } from './dto/signup.dto';
import { SigninDTO } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import IJWTPayload from './interfaces/jwt.payload.interface';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signup(userData: SignupDTO): Promise<string> {
    try {
      this.logger.log(
        `Initiating signup for user with email: ${userData.email}`,
      );

      const isExistingUser = await this.userService.getUserByEmail(
        userData.email,
      );
      this.logger.log(
        `Checked for existing user: ${JSON.stringify(isExistingUser)}`,
      );

      if (isExistingUser) {
        this.logger.error(
          `Signup failed: User already exists with email ${userData.email}`,
        );
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = await this.hashPassword(userData.password);
      this.logger.log(
        `Password hashed successfully for user ${userData.email}`,
      );

      this.logger.log(`Creating new user in the database`);
      const newUser = await this.userService.createUser({
        ...userData,
        password: hashedPassword,
      });

      this.logger.log(`User created successfully with ID: ${newUser._id}`);

      const payload: IJWTPayload = {
        sub: newUser._id.toString(),
        email: newUser.email,
      };
      return await this.generateJwt(payload);
    } catch (error) {
      this.logger.error(`Signup error: ${error.message}`, error.stack);
      throw error;
    }
  }

  async signin(userData: SigninDTO) {
    try {
      this.logger.log(
        `Attempting to sign in user with email: ${userData.email}`,
      );

      const user = await this.userService.getUserByEmail(userData.email);
      if (!user) {
        this.logger.warn(`Sign-in failed: Incorrect email - ${userData.email}`);
        throw new UnauthorizedException('Incorrect email or password');
      }

      const comparePasswords = await this.comparePasswords(
        userData.password,
        user.password,
      );
      if (!comparePasswords) {
        this.logger.warn(
          `Sign-in failed: Incorrect password for email - ${userData.email}`,
        );
        throw new UnauthorizedException('Incorrect email or password');
      }

      const payload = {
        sub: user._id.toString(),
        email: user.email,
      };
      this.logger.log(`User ${user._id} authenticated successfully`);

      return await this.generateJwt(payload);
    } catch (error) {
      this.logger.error(`Sign-in error: ${error.message}`, error.stack);
      throw error;
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      this.logger.log(`Hashing password`);
      const hashedPassword = await bcrypt.hash(password, 10);
      this.logger.log(`Password hashed successfully`);
      return hashedPassword;
    } catch (error) {
      this.logger.error(
        `Error hashing password: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      this.logger.log(`Comparing password`);
      const isMatch = await bcrypt.compare(password, hashedPassword);
      this.logger.log(`Password comparison result: ${isMatch}`);
      return isMatch;
    } catch (error) {
      this.logger.error(
        `Error comparing passwords: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async generateJwt(payload: IJWTPayload): Promise<string> {
    try {
      this.logger.log(
        `Generating JWT with payload: ${JSON.stringify(payload)}`,
      );
      const token = this.jwtService.sign(payload);
      this.logger.log(`JWT generated successfully`);
      return token;
    } catch (error) {
      this.logger.error(`Error generating JWT: ${error.message}`, error.stack);
      throw error;
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
