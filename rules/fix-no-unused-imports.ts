import { unusedImportsPredicate } from "../utils/predicates";
import {rules } from "@typescript-eslint/eslint-plugin"
import ruleComposer from "eslint-rule-composer"

const rule = rules['no-unused-vars']
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

export default ruleComposer.filterReports(rule, unusedImportsPredicate);
