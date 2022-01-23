"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = exports.app = exports.appBindings = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const app_1 = require("./app");
const config_service_1 = require("./config/config.service");
const prisma_service_1 = require("./database/prisma.service");
const exception_filter_1 = require("./errors/exception.filter");
const logger_service_1 = require("./logger/logger.service");
const types_1 = require("./types");
const users_controller_1 = require("./users/users.controller");
const users_repository_1 = require("./users/users.repository");
const users_service_1 = require("./users/users.service");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilter).inSingletonScope();
    bind(types_1.TYPES.UserController).to(users_controller_1.UserController).inSingletonScope();
    bind(types_1.TYPES.UserService).to(users_service_1.UserService).inSingletonScope();
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.PrismaService).to(prisma_service_1.PrismaService).inSingletonScope();
    bind(types_1.TYPES.UsersRepository).to(users_repository_1.UsersRepository).inSingletonScope();
    bind(types_1.TYPES.Application).to(app_1.App).inSingletonScope();
});
const bootstrap = () => {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { app, appContainer };
};
_a = bootstrap(), exports.app = _a.app, exports.appContainer = _a.appContainer;
//# sourceMappingURL=main.js.map