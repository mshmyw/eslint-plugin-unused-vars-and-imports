import { ESLintUtils } from '@typescript-eslint/utils';
import { rules } from "@typescript-eslint/eslint-plugin";
const noUnusedVars = rules['no-unused-vars'];
const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);
const commaFilter = { filter: (token) => token.value === "," };
const includeCommentsFilter = { includeComments: true };
export default createRule({
    name: 'fix-unused-vars',
    defaultOptions: [],
    meta: {
        type: "problem",
        messages: {
            fixUnusedVarsAndImports: '声明但未使用的变量，可使用 --fix 移除',
        },
        docs: {
            description: "声明但未使用的变量，可使用 --fix 移除",
            recommended: "error",
        },
        fixable: "code",
        schema: noUnusedVars.meta.schema,
    },
    create(context) {
        // 此处借助已有规则扩展
        // const noUnusedVarsRule = noUnusedVars.create(context);
        const sourceCode = context.getSourceCode();
        const fixUnusedImportsFn = (node) => {
            const { parent } = node;
            // If parent is null just let the composed rule handle it
            if (parent == null) {
                return;
            }
            const unusedImportsruleFixFn = (fixer) => {
                var _a;
                const grandParent = parent; // TODO: why?
                if (!grandParent) {
                    return null;
                }
                // Only one import
                if (((_a = grandParent === null || grandParent === void 0 ? void 0 : grandParent.specifiers) === null || _a === void 0 ? void 0 : _a.length) === 1) {
                    const nextToken = sourceCode.getTokenAfter(grandParent, includeCommentsFilter);
                    const newLinesBetween = nextToken ? nextToken.loc.start.line - grandParent.loc.start.line : 0;
                    const endOfReplaceRange = nextToken ? nextToken.range[0] : grandParent.range[1];
                    const count = Math.max(0, newLinesBetween - 1);
                    return [
                        fixer.remove(grandParent),
                        fixer.replaceTextRange([grandParent.range[1], endOfReplaceRange], "\n".repeat(count)),
                    ];
                }
                return null;
            };
            context.report({
                node,
                messageId: 'fixUnusedVarsAndImports',
                fix: unusedImportsruleFixFn
            });
        };
        return {
            ImportSpecifier: fixUnusedImportsFn,
            ImportDefaultSpecifier: fixUnusedImportsFn,
            ImportNamespaceSpecifier: fixUnusedImportsFn
        };
        // return {
        //   ...noUnusedVarsRule,
        //   "Program:exit"(): void {
        //     const fixableUnusedVars = collectUnusedVariables(context)
        //     for (const variable of fixableUnusedVars) {
        //       context.report({
        //         node: variable.node,
        //         messageId: 'fixUnusedVarsAndImports', // `Unused variable: ${variable.name}`,
        //         fix: (fixer) => fixer.removeRange([variable.node.range[0], variable.node.init ? variable.node.init.range[0] : variable.node.range[1]]),
        //       });
        //     }
        //   },
        // };
    },
});
