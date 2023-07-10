'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const user_model_1 = require('../user/user.model');
const loginUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    // check user
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(id);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    // match password
    if (!user.isPasswordMatch(password, isUserExist.password)) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password does not match'
      );
    }
    const { id: userId, role, needPasswordChange } = isUserExist;
    const accessToken = jwtHelpers_1.JwtHelpers.createToken(
      { id: userId, role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expiration
    );
    const refreshToken = jwtHelpers_1.JwtHelpers.createToken(
      { id: userId, role },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expiration
    );
    return {
      accessToken,
      refreshToken,
      needPasswordChange,
    };
  });
const refreshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelpers_1.JwtHelpers.verifyToken(
        token,
        config_1.default.jwt.refresh_secret
      );
    } catch (error) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid refresh token'
      );
    }
    // checking deleted users refresh token
    const user = new user_model_1.User();
    const { id } = verifiedToken;
    const isUserExist = yield user.isUserExist(id);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    // generate new token
    const newAccessToken = jwtHelpers_1.JwtHelpers.createToken(
      { id: isUserExist.id, role: isUserExist.role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expiration
    );
    return {
      accessToken: newAccessToken,
    };
  });
exports.AuthService = {
  loginUser,
  refreshToken,
};
