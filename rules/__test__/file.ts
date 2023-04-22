import { ESLintUtils } from '@typescript-eslint/utils';
import importsRule from '../../lib/rules/fix-no-unused-imports';
import varsRule from '../../lib/rules/fix-no-unused-vars';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   tsconfigRootDir: __dirname,
  //   project: './tsconfig.json',
  // },
});
ruleTester.run('no-unused-imports', importsRule, {
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

// ruleTester.run('no-unused-vars', varsRule, {
//   valid: [
//     "const a = 3; console.log(a);"
//   ],
//   invalid: [
//     {
//       code: "const a = 3,b=2; console.log(b);",
//       output: "const b=2; console.log(b);",
//       errors: [{ messageId: 'unusedVar' }]
//     }
//   ],
// });