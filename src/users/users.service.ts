import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { IUsersService } from './users.service.interface';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	public async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		// проверка -> null если существует или создаем и возвращаем User
		const newUser = new User(email, name);
		const salt = Number(this.configService.get('SALT'));
		await newUser.setPassword(password, salt);
		const existingUser = await this.usersRepository.find(email);

		if (existingUser) {
			return null;
		}

		return this.usersRepository.create(newUser);
	}
	public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existingUser = await this.usersRepository.find(email);

		if (!existingUser) {
			return false;
		}

		const newUser = new User(existingUser.email, existingUser.name, existingUser.password);

		return newUser.validatePassword(password);
	}

	public async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
