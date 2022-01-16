import express, { Express } from 'express'
import { Server } from 'http'
import { ExceptionFilter } from './errors/exception.filter'
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/users.controller'

export class App {
	app: Express
	server: Server
	port: number
	logger: LoggerService
	userController: UserController
	exceptionFilter: ExceptionFilter

	constructor(logger: LoggerService, userController: UserController, exceptionFilter: ExceptionFilter) {
		this.app = express()
		this.port = 8000
		this.logger = logger
		this.userController = userController
		this.exceptionFilter = exceptionFilter
	}

	public useRoutes() {
		const userRouter = this.userController.router
		this.app.use('/users', userRouter)
	}

	public useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	public async init() {
		this.useRoutes()
		this.useExceptionFilters()
		this.server = this.app.listen(this.port)
		this.logger.log(`Server started at http://localhost/${this.port}`)
	}
}
