module.exports = {
  "root": true,
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "jest": true
  },
  "globals": {
    "graphql": true,
    "page": true,
    "browser": true,
    "jestPuppeteer": true
  },
  "plugins": ["jest"],
  "settings": {
    "import/core-modules": ["prop-types", "react"]
  },
  "rules": {
    "function-paren-newline": ["error", "consistent"],
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["to"],
        "aspects": ["noHref", "invalidHref", "preferButton"]
      }
    ],
    "react/forbid-prop-types": [0],
    "import/prefer-default-export": [0]
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true
  }
}
