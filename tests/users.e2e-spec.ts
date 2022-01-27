import request, { Response } from 'supertest';
import { boot } from '../src/main';
import { App } from './../src/app';

let application: App;

const mockData = {
	email: 'dsa@f.ru',
	name: 'ad',
	password: 'dfs',
};

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

afterAll(() => application.close());

describe('Users e2e', () => {
	describe('Register', () => {
		it('Error', async () => {
			const res = await request(application.app).post('/users/register').send(mockData);
			expect(res.statusCode).toBe(422);
		});
	});

	describe('Login', () => {
		it('Success', async () => {
			const res = await request(application.app)
				.post('/users/login')
				.send({ email: mockData.email, password: mockData.password });
			expect(res.statusCode).toBe(200);
			expect(res.body.jwt).not.toBeUndefined();
		});
		it('Error - wrong email', async () => {
			const res = await request(application.app)
				.post('/users/login')
				.send({ email: 'dsa@f1.ru', password: mockData.password });
			expect(res.statusCode).toBe(401);
			expect(res.body.jwt).toBeUndefined();
		});
		it('Error - wrong password', async () => {
			const res = await request(application.app)
				.post('/users/login')
				.send({ email: mockData.email, password: 'pswrd' });
			expect(res.statusCode).toBe(401);
			expect(res.body.jwt).toBeUndefined();
		});
	});

	describe('Info', () => {
		it('Success', async () => {
			const login = await request(application.app)
				.post('/users/login')
				.send({ email: mockData.email, password: mockData.password });
			const res = await request(application.app)
				.get('/users/info')
				.set('Authorization', `Bearer ${login.body.jwt}`);
			expect(res.statusCode).toBe(200);
			expect(res.body.email).toBe(mockData.email);
		});
		it('Error - wrong JWT', async () => {
			const res = await request(application.app)
				.get('/users/info')
				.set('Authorization', `Bearer 1`);
			expect(res.statusCode).toBe(401);
			expect(res.body.email).toBeUndefined();
		});
	});
});
