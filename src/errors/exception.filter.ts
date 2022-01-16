import { NextFunction, Request, Response } from 'express'
import { ILogger } from './../logger/logger.interface'
import { IExceptionFilter } from './exception.filter.interface'
import { HTTPError } from './http-error.class'

export class ExceptionFilter implements IExceptionFilter {
	logger: ILogger

	constructor(logger: ILogger) {
		this.logger = logger
	}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`)
			res.status(err.statusCode).send({ err: err.message })
		} else {
			this.logger.error(`${err.message}`)
			res.status(500).send({ err: err.message })
		}
	}
}
