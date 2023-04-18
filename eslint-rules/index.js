"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const no_raw_number_calculation_1 = __importDefault(require("./no-raw-number-calculation"));
exports.rules = {
    'no-raw-number-calculation': no_raw_number_calculation_1.default
};
