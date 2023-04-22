import { ESLintUtils } from '@typescript-eslint/utils';
import rule from '../fix-no-unused-imports';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   tsconfigRootDir: __dirname,
  //   project: './tsconfig.json',
  // },
});
ruleTester.run('no-unused-imports', rule, {
  valid: [
    "import { a } from 'react'; const x = a;"
  ],
  invalid: [
    {
      code: "import { a } from 'react'; console.log('unused');",
      output: "console.log('unused');",
      errors: [{ messageId: 'unusedVar' }]
    }
  ],
});