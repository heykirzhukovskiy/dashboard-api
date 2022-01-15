import { Logger } from 'tslog'

export class LoggerService {
	private logger: Logger

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		})
	}

	log(...args: unknown[]): void {
		this.logger.info(...args)
	}

	error(...args: unknown[]): void {
		this.logger.info(...args)
	}

	warn(...args: unknown[]): void {
		this.logger.info(...args)
	}
}
