import { TSESTree, TSESLint, ESLintUtils } from '@typescript-eslint/utils';
import {rules} from "@typescript-eslint/eslint-plugin"

const noUnusedVars = rules['no-unused-vars']
const createRule = ESLintUtils.RuleCreator(
    name => `https://example.com/rule/${name}`,
);

type TFixUnusedVars = 'fixUnusedVars'
export default createRule({
    name: 'fix-unused-vars',
    defaultOptions: [],
    meta: {
      type: "suggestion",
      messages: {
       fixUnusedVars: 'fix unused vars.',
      },
      docs: {
        description: "Fix unused variables.",
        recommended: "warn",
      },
      fixable: "code",
      schema: [],
    },
    create(context: TSESLint.RuleContext<TFixUnusedVars, []>) {
      const noUnusedVarsRule = noUnusedVars.create(context);

      return {
        ...noUnusedVarsRule,

        "Program:exit"(): void {
          const sourceCode = context.getSourceCode();

          const fixableUnusedVars = noUnusedVarsRule
            ?.getAllUnusedVariables()
            ?.filter((variable) => !sourceCode.getCommentsBefore(variable.node).some((comment) => comment.value.includes("@ts-ignore")));

          for (const variable of fixableUnusedVars) {
            context.report({
              node: variable.node,
              message: `Unused variable: ${variable.name}`,
              fix: (fixer) => fixer.removeRange([variable.node.range[0], variable.node.init ? variable.node.init.range[0] : variable.node.range[1]]),
            });
          }
        },
      };
    },
  });