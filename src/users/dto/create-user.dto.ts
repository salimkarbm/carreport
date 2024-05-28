import { IsEmail, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @Expose()
  @IsEmail()
  @IsString()
  email: string;

  // @Exclude()
  @IsString()
  password: string;
}
