import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errors/http-error.class'
import { TYPES } from '../types'
import { ILogger } from './../logger/logger.interface'

@injectable()
export class UserController extends BaseController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService)
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		])
	}

	private login(req: Request, res: Response, next: NextFunction) {
		next(new HTTPError(401, 'ошибка авторизации', 'login'))
	}
	private register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register')
	}
}
