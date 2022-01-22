import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IUsersController } from './users/users.controller.interface';
import { UserService } from './users/users.service';
import { IUsersService } from './users/users.service.interface';

// async function bootstrap() {
// const logger = new LoggerService()
// const userController = new UserController(logger)
// const exceptionFilter = new ExceptionFilter(logger)
// const app = new App(logger, userController, exceptionFilter)

// await app.init()
// }

// bootstrap()

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUsersController>(TYPES.UserController).to(UserController);
	bind<IUsersService>(TYPES.UserService).to(UserService);
	bind<App>(TYPES.Application).to(App);
});

const bootstrap = (): IBootstrapReturn => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
