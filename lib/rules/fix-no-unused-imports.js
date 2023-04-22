"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const predicates_1 = require("../utils/predicates");
const eslint_plugin_1 = require("@typescript-eslint/eslint-plugin");
const eslint_rule_composer_1 = __importDefault(require("eslint-rule-composer"));
const rule = eslint_plugin_1.rules['no-unused-vars'];
rule.meta.fixable = "code";
rule.meta.messages = {
    unusedVar: '声明但未使用的导入变量，可使用 --fix 移除',
};
// const rule = {
//     ...noUnusedVarsBaseRule,
//     name: 'no-unused-imports',
//     defaultOptions: [],
//     meta: {
//         type: "problem",
//         messages: {
//             noUnusedImports: '1声明但未使用的变量，可使用 --fix 移除',
//         },
//         docs: {
//         description: "声明但未使用的变量，可使用 --fix 移除",
//         recommended: "error",
//         },
//         fixable: "code",
//         schema: noUnusedVarsBaseRule.meta.schema,
//     }
// }
exports.default = eslint_rule_composer_1.default.filterReports(rule, predicates_1.unusedImportsPredicate);
