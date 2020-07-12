module.exports = {
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "codeFrame": true,
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "jsx": true,
            "legacyDecorators": true
        },  
    },
    "parser": 'babel-eslint',
    "settings": {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "16.8.6",
            "flowVersion": "0.53"
        }
    },
    "plugins": [
        "react",
        //"react-hooks"
    ],
    "rules": {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "no-unused-vars": ["error", { "varsIgnorePattern": "^style" }],
        "react/prop-types": [1],
        "no-console": [1],
        "react/no-string-refs": [1],
        "react/jsx-no-target-blank": [1],
        "react/display-name": [1],
        //"react-hooks/rules-of-hooks": "error",
        //"react-hooks/exhaustive-deps": "warn"
    }, 
    "globals": {
        "google": true,
        "PROJECT_ENV": true,
        "VERSION_ENV": true,
        "PATH_ENV": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    }
};
