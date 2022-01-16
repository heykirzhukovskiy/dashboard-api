"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const exception_filter_1 = require("./errors/exception.filter");
const app_1 = require("./app");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./users/users.controller");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new logger_service_1.LoggerService();
        const userController = new users_controller_1.UserController(logger);
        const exceptionFilter = new exception_filter_1.ExceptionFilter(logger);
        const app = new app_1.App(logger, userController, exceptionFilter);
        yield app.init();
    });
}
bootstrap();
