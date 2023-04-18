"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
// https://typescript-eslint.io/docs/development/custom-rules
const createRule = utils_1.ESLintUtils.RuleCreator(
// rule 的说明文档链接
name => `https://example.com/rule/${name}`);
/**
 * Options: rule 支持的参数
 * MessageIds: 上传错误提示的id
 */
exports.default = createRule({
    name: 'no-raw-number-calculation',
    meta: {
        type: 'problem',
        docs: {
            description: '避免原生js number类型的四则运算，可以使用bigJs',
            recommended: 'error',
            requiresTypeChecking: true,
        },
        messages: {
            noRawNumberCalculation: '避免原生js number类型的四则运算，可以使用bigJs',
        },
        schema: null // rule参数说明；这里做个简单的demo，不支持参数
    },
    defaultOptions: [],
    create(context) {
        const parserServices = utils_1.ESLintUtils.getParserServices(context);
        const checker = parserServices.program.getTypeChecker();
        const getNodeType = (node) => {
            // eslint ast 节点 和 TypeScript ts.Node 等效项的映射
            const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
            // 拿到typescript 源代码的类型信息
            // const a: number = 1 拿到a的类型信息
            return checker.getTypeAtLocation(tsNode);
        };
        const checkBinaryExpression = (node) => {
            const leftNodeType = getNodeType(node.left);
            const rightNodetType = getNodeType(node.right);
            // 操作符两边都是number类型
            if (leftNodeType.isNumberLiteral() && rightNodetType.isNumberLiteral()) {
                context.report({
                    node,
                    messageId: 'noRawNumberCalculation',
                });
            }
        };
        return {
            // +-*/ 四则运算
            "BinaryExpression[operator='+']": checkBinaryExpression,
            "BinaryExpression[operator='-']": checkBinaryExpression,
            "BinaryExpression[operator='*']": checkBinaryExpression,
            "BinaryExpression[operator='/']": checkBinaryExpression
        };
    }
});
