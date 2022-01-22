import { injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

@injectable()
export class UserService implements IUsersService {
	public async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		// проверка -> null если существует или создаем и возвращаем User
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		// if (email !== undefined && name !== undefined && password !== undefined) {
		// 	return newUser;
		// }
		return null;
	}
	public async validateUser(dto: UserLoginDto): Promise<boolean> {
		return await true;
	}
}
