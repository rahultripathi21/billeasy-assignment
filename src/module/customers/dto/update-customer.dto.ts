import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateCustomerDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address: string;
}
