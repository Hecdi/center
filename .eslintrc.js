module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    "plugin:prettier/recommended",
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
	  "prettier/prettier": ["error",{
		  "printWidth": 500,
		  "tabWidth":4,
		  "useTabs":true,
		  "semi":true,
		  "jsxBracketSameLine":true,
		  "arrowParens": "always",
		  "trailingComma": "all",
		  "singleQuote": true
	  }],
	  // allow async-await
	  'generator-star-spacing': 'off',
	  // allow debugger during development
	  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	  "no-unused-vars": [0, {  "args": "none", "ignoreRestSiblings": true ,"varsIgnorePattern": "log"}],
	  "no-undef":2,
	  "eqeqeq": [0, "always"],
        "no-empty": 0,
        "comma-dangle": 0,
        "comma-spacing": [1, {
            "before": false,
            "after": true
        }],
        "constructor-super": 2,
        "new-cap": [0, {
            "newIsCap": true,
            "capIsNew": false
        }],
        "new-parens": 2,
        "no-array-constructor": 2,
        "no-class-assign": 2,
        "no-cond-assign": 2,
        "no-mixed-spaces-and-tabs": 0,
		"vue/no-unused-components": 0,
  }
};


