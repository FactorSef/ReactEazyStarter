[README.md](../README.md) > [docs](./intro.md) > Project configuration

---

# Project configuration

> Most config files use TypeScript to avoid errors

## Configuring TypeScripts

TypeScript is configured in the file `[root]/tsconfig.json`, details in the official [documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

## Configuring webpack

The webpack configuration file is located in the file `[root]/configurations/webpack.config.ts`. The webpack configuration rules can be found on the [official site](https://webpack.js.org/concepts/).

## Defining environment variables (env)

The [env-cmd](https://github.com/toddbluhm/env-cmd "github repo") package was chosen to define environment variables. it allows you to break variables into artifacts and list the ones needed for each individual command.

> The project contains a file `[root]/.env-cmdrc.json` with which you can set variables

## browserslist

The [browserslist](https://github.com/browserslist/browserslist "github repo") configuration is located in the file `[root]/.browserslistrc`. It is split into 2 parts:
* production - to determine the compatibility of the production version
* development - to determine the browser compatibility of the development version

## Editor Config

The configuration for the IDE or most code editors can be set in the file `[root]/.editorconfig`

> For VS Code users, you need to install the [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) extension

## Babel

[Babel](https://babeljs.io) settings are located in the file `[root]/babel.config.js`

## ESLint

The main [ESLint](https://eslint.org/) configuration file is located in the file `[root]/.eslintrc`.

Rule artifacts are located in the directory `[root]/configurations/eslint`:
* For JS - `[root]/configurations/eslint/js.eslint.json`
* For TS - `[root]/configurations/eslint/ts.eslint.json`
* For React - `[root]/configurations/eslint/react.eslint.json`

## Prettier

The [Prettier](https://prettier.io) configuration is in the file `[root]/.prettierrc.json`

## PostCSS

The [PostCSS](https://postcss.org) configuration is located in the file `[root]/postcss.config.js`
