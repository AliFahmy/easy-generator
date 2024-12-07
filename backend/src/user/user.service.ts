import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<UserDocument> {
    try {
      this.logger.log(`Creating user with data: ${JSON.stringify(user)}`);
      return await this.userModel.create(user);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    try {
      this.logger.log(`Getting user with email: ${email}`);
      return await this.userModel.findOne({ email });
    } catch (error) {
      this.logger.error(
        `Failed to get user by email: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
