'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
/* eslint-disable no-unused-vars */
const cors_1 = __importDefault(require('cors'));
const express_1 = __importDefault(require('express'));
const globalErrorHandler_1 = __importDefault(
  require('./app/middlewares/globalErrorHandler')
);
const routes_1 = __importDefault(require('./app/routes'));
const http_status_1 = __importDefault(require('http-status'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(
  express_1.default.urlencoded({
    extended: true,
  })
);
app.use('/api/v1', routes_1.default);
// testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
// })
// global error handler
app.use(globalErrorHandler_1.default);
// handle not found
app.use((req, res, next) => {
  res.status(http_status_1.default.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api end point not found',
      },
    ],
  });
});
exports.default = app;
