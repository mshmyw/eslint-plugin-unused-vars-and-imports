"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const fix_no_unused_vars_1 = __importDefault(require("./fix-no-unused-vars"));
const fix_no_unused_imports_1 = __importDefault(require("./fix-no-unused-imports"));
exports.rules = {
    'no-unused-imports': fix_no_unused_imports_1.default,
    'no-unused-vars': fix_no_unused_vars_1.default
};
