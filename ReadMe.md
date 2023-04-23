# 作用
可移除未使用导入变量，某些局部变量，例如：
image.png

# 使用
安装：
```
yarn install @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript-eslint/utils eslint -D
yarn install eslint-plugin-unused-vars-and-imports -D
```
配置：
eslintrc.js
```
module.exports = {
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "unused-vars-and-imports"
    ],
    "rules": {
        "no-unused-vars": "off",
        "unused-vars-and-imports/no-unused-imports": "error",
        "unused-vars-and-imports/no-unused-vars": "error"
    }
}

```
# 参考：
1.  [eslint-rule-composer](https://github.com/not-an-aardvark/eslint-rule-composer)
2. [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)
3. [eslint fix](https://zh-hans.eslint.org/docs/latest/extend/custom-rules#%E5%BA%94%E7%94%A8%E4%BF%AE%E5%A4%8D)
4. https://smartdevpreneur.com/the-3-best-eslint-no-unused-vars-option-settings-make-it-less-strict/
5. https://eslint.org/docs/latest/rules/no-unused-vars
6. https://itnext.io/7-recommended-eslint-rules-for-react-typescript-project-1a22b011b4b5
7. https://github.com/aladdin-add/eslint-plugin
8. https://zh-hans.eslint.org/docs/latest/extend/selectors
9. https://eslint.org/docs/latest/extend/custom-rules