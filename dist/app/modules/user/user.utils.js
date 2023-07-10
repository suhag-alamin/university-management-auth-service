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
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateAdminId =
  exports.generateFacultyId =
  exports.generateStudentId =
  exports.findLastAdminId =
  exports.findLastFacultyId =
  exports.findLastStudentId =
    void 0;
const user_1 = require('../../../enums/user');
const user_model_1 = require('./user.model');
const findLastStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne(
      {
        role: user_1.ENUM_USER_ROLE.STUDENT,
      },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id
    )
      ? lastStudent === null || lastStudent === void 0
        ? void 0
        : lastStudent.id.substring(4)
      : undefined;
  });
exports.findLastStudentId = findLastStudentId;
const findLastFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne(
      {
        role: user_1.ENUM_USER_ROLE.FACULTY,
      },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id
    )
      ? lastFaculty === null || lastFaculty === void 0
        ? void 0
        : lastFaculty.id.substring(2)
      : undefined;
  });
exports.findLastFacultyId = findLastFacultyId;
const findLastAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lastAdmin = yield user_model_1.User.findOne(
      {
        role: user_1.ENUM_USER_ROLE.ADMIN,
      },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id)
      ? (_a =
          lastAdmin === null || lastAdmin === void 0
            ? void 0
            : lastAdmin.id) === null || _a === void 0
        ? void 0
        : _a.substring(2)
      : undefined;
  });
exports.findLastAdminId = findLastAdminId;
const generateStudentId = academicSemester =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const currentId =
      (yield (0, exports.findLastStudentId)()) ||
      (0).toString().padStart(5, '0');
    //   increment by 1
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    const fullStudentID = `${
      (_b =
        academicSemester === null || academicSemester === void 0
          ? void 0
          : academicSemester.year) === null || _b === void 0
        ? void 0
        : _b.substring(2)
    }${
      academicSemester === null || academicSemester === void 0
        ? void 0
        : academicSemester.code
    }${incrementedId}`;
    return fullStudentID;
  });
exports.generateStudentId = generateStudentId;
const generateFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastFacultyId)()) ||
      (0).toString().padStart(5, '0');
    //   increment by 1
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    const fullFacultyID = `F-${incrementedId}`;
    return fullFacultyID;
  });
exports.generateFacultyId = generateFacultyId;
const generateAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0');
    //   increment by 1
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    const fullAdminID = `A-${incrementedId}`;
    return fullAdminID;
  });
exports.generateAdminId = generateAdminId;
