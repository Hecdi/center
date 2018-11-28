module.exports = {
  root: true,
  env: {
    "browser": true,
    "es6": true,
    "node": true,
    "worker":true,
    "commonjs": true
  },
//"@vue/prettier"
  extends: ["plugin:prettier/recommended","plugin:vue/essential"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": ["error",{
        "printWidth": 500,
        "tabWidth":4,
        "useTabs":true,
        "semi":true,
        "jsxBracketSameLine":true,
        "arrowParens": "always",
        //尾部加逗号 trailingComma: "<none|es5|all>"
        "trailingComma": "all",
        "singleQuote": true
    }],
    "linebreak-style": [
        "error",
        "unix"
    ],
    "eqeqeq": [0, "always"],
    "no-empty": 0,
    "comma-dangle": 0,
    "no-unused-vars": [0, {  "args": "none", "ignoreRestSiblings": true ,"varsIgnorePattern": "log"}],
    "no-undef":2,
    "no-use-before-define":2,
    "no-console": 0,
    "no-case-declarations": 1,
    "no-const-assign": 2,
    "no-dupe-class-members": 2,
    "no-duplicate-case": 2,
    "no-extra-parens": [2, "functions"],
    "no-self-compare": 2,
    "no-unexpected-multiline": 1,
    "accessor-pairs": 2,
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
  },
  parserOptions: {
    parser: "babel-eslint",
    "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true,
        "arrowFunctions": true,
        "classes": true,
        "modules": true,
        "defaultParams": true
    },
    "sourceType": "module"
  }
};
