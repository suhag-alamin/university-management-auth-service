"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_validation_1 = require("./student.validation");
const router = express_1.default.Router();
router.get('/', student_controller_1.StudentController.getAllStudents);
router.get('/:id', student_controller_1.StudentController.getSingleStudent);
router.patch('/update/:id', (0, validateRequest_1.default)(student_validation_1.StudentValidation.updateStudentZodSchema), student_controller_1.StudentController.updateStudent);
router.delete('/delete/:id', student_controller_1.StudentController.deleteStudent);
exports.StudentRoutes = router;
