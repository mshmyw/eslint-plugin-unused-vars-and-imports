"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const no_raw_number_calculation_1 = __importDefault(require("./no-raw-number-calculation"));
exports.default = {
    rules: {
        'no-raw-number-calculation': no_raw_number_calculation_1.default
    }
};
