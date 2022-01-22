import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong email' })
	email: string;

	@IsString({ message: 'Not specified password' })
	password: string;

	@IsString({ message: 'Not specified name' })
	name: string;
}
