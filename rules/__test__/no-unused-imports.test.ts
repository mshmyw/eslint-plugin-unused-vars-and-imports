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
// ruleTester.run('no-unused-imports', importsRule, {
//   valid: [
//     "import { a } from 'react'; const x = a;"
//   ],
//   invalid: [
//     {
//       code: "import { a } from 'react'; console.log('unused');",
//       output: "console.log('unused');",
//       errors: [{ messageId: 'unusedVar' }]
//     }
//   ],
// });

ruleTester.run('no-unused-vars', varsRule, {
  valid: [
    "const a = 3; console.log(a);"
  ],
	invalid: [
    {
      code: "const {a=3,b=2}=obj; console.log(b);",
      output: "const {b=2}=obj; console.log(b);",
      errors: [{ messageId: 'unusedVar' }]
    },
		{
			code: `const [a, b] = [1,2];console.log(b);`,
			output: `const [, b] = [1,2];console.log(b);`,
			errors: [{messageId: 'unusedVar'}],
		},

		// {
		// 	code: `const a = 3;const b = 2;console.log(b);`,
		// 	errors: ["'a' is assigned a value but never used."],
		// 	output: `const b = 2;console.log(b);`
		// },
		// {
		// 	code: `const b = undefined;`,
		// 	errors: ["'b' is assigned a value but never used."],
		// 	output: ``
		// },
		// {
		// 	code: `const obj = {a: 3, b: 2};const {a, b} = obj;console.log(b);`,
		// 	errors: ["'a' is assigned a value but never used."],
		// 	output: `const obj = {a: 3, b: 2};const { b} = obj;console.log(b);`
		// },
		// {
		// 	code: `const [a=1, b=2] = obj;console.log(b);`,
		// 	errors: ["'a' is assigned a value but never used."],
		// 	output: `const [, b=2] = obj;console.log(b);`,
		// },
		// // TODO: 需过滤掉函数类型
		// {
		// 	code: `const fn = (a=1,b=2) => { return b;};console.log(fn);`,
		// 	errors: ["'a' is assigned a value but never used."],
		// 	output: `const fn = (a=1,b=2) => { return b;};console.log(fn);`,
		// },
		// {
		// 	code: `let {...a} = b`,
		// 	errors: ["'a' is assigned a value but never used."],
		// 	output: `let {} = b`
		// }
	]
  // invalid: [
  //   {
  //     code: "const a = 3,b=2; console.log(b);",
  //     output: "const b=2; console.log(b);",
  //     errors: [{ messageId: 'unusedVar' }]
  //   }
  // ],
});