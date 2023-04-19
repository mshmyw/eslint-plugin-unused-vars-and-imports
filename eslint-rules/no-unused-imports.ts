import { TSESTree, TSESLint, ESLintUtils } from '@typescript-eslint/utils';
import {rules } from "@typescript-eslint/eslint-plugin"
import {collectUnusedVariables} from "@typescript-eslint/eslint-plugin/dist/util/collectUnusedVariables"
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
    create(context) {
      const noUnusedVarsRule = noUnusedVars.create(context);

      return {
        ...noUnusedVarsRule,

        "Program:exit"(): void {
          const fixableUnusedVars = collectUnusedVariables(context)
          for (const variable of fixableUnusedVars) {
            context.report({
              node: variable.node,
              messageId: 'fixUnusedVars', // `Unused variable: ${variable.name}`,
              fix: (fixer) => fixer.removeRange([variable.node.range[0], variable.node.init ? variable.node.init.range[0] : variable.node.range[1]]),
            });
          }
        },
      };
    },
  });