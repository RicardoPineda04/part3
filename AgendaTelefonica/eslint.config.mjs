import globals from "globals";
import pluginJs from "@eslint/js";
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    languageOptions: 
      { globals: globals.node }
  },
  pluginJs.configs.recommended,
  js.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
          'error',
          4
      ],
      '@stylistic/js/linebreak-style': [
          'error',
          'windows'
      ],
      '@stylistic/js/quotes': [
          'error',
          'single'
      ],
      '@stylistic/js/semi': [
          'error',
          'never'
      ],
    }
  },
  { ignores: 
      ["dist", 'eslint.config.mjs']
  }
];