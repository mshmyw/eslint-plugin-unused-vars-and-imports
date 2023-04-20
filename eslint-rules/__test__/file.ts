import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../no-raw-number-calculation';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
});
ruleTester.run('my-typed-rule', rule, {
  valid: [
    "const a = 1; const b = '2'; console.log(a + b);"
  ],
  invalid: [
    {
      code: "const a = 2; const b = 4; console.log(a + b)",
      errors: [{ messageId: 'noRawNumberCalculation' }]
    }
  ],
});