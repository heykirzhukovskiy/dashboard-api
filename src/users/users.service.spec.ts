import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { UsersService } from './users.service';
import { IUsersService } from './users.service.interface';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};
const UsersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	container.bind<IUsersService>(TYPES.UsersService).to(UsersService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUsersService>(TYPES.UsersService);
});

let createdUser: UserModel | null;

const mockData = {
	email: 'foo@example.com',
	name: 'Foo',
	password: 'password',
};

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce(1);
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await usersService.createUser(mockData);

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual(mockData.password);
	});
	it('validateUser - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const { email, password } = mockData;
		const isUserValidated = await usersService.validateUser({ email, password });

		expect(isUserValidated).toBeTruthy();
	});
	it('validateUser - wrong pass', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const isUserValidated = await usersService.validateUser({
			email: mockData.email,
			password: '1',
		});

		expect(isUserValidated).toBeFalsy();
	});
	it('validateUser - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const { email, password } = mockData;
		const isUserValidated = await usersService.validateUser({ email, password });

		expect(isUserValidated).toBeFalsy();
	});
});
