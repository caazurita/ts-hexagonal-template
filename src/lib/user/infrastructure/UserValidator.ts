import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class getOneByIdValidator {
  @IsNumberString()
  id: string;
}

export class getOneByEmailValidator {
  @IsString()
  @IsEmail()
  email: string;
}

export class CreateValidator {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
}

export class UpdateValidator {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  password: string;
}
