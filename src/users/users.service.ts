import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

@injectable()
export class UserService implements IUsersService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	public async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		// проверка -> null если существует или создаем и возвращаем User
		const newUser = new User(email, name);
		const salt = Number(this.configService.get('SALT'));
		await newUser.setPassword(password, salt);
		// if (email !== undefined && name !== undefined && password !== undefined) {
		// 	return newUser;
		// }
		return null;
	}
	public async validateUser(dto: UserLoginDto): Promise<boolean> {
		return await true;
	}
}
