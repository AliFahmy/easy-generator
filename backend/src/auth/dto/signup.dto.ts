import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignupDTO {
  @ApiProperty({ description: 'User Email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  password: string;

  @ApiProperty({ description: 'User name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
