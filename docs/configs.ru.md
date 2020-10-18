[README.md](../README.ru.md) > [docs](./intro.ru.md) > Конфигурация проекта

---

# Конфигурация проекта

> Большинство конфиграционных файлов используют TypeScript, чтобы избежать ошибок

## Настройка TypeScripts

Настрока TypeScript осуществляется в файле `[root]/tsconfig.json`, подробности в официальной [документации](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

## Настройка webpack

Конфигурационный файл webpack находится в файле `[root]/configurations/webpack.config.ts`. Правила конфигурации webpack можно найти на [официальном сайте](https://webpack.js.org/concepts/).

## Определение переменных окружения (env)

Для определения переменных окружения среды был выбран пакет [env-cmd](https://github.com/toddbluhm/env-cmd "github repo"), т.к. он позволяет разбивать переменные на артефакты и перечислять нужные для каждой отдельной команды.

> В проекте присутвует файл `[root]/.env-cmdrc.json` с помощью которого можно задать переменные

## browserslist

Конфигурация [browserslist](https://github.com/browserslist/browserslist "github repo") находиться в файле `[root]/.browserslistrc`. Он разбит на 2 части:
* production - для определения совместимости production версии
* development - для определения браузерной совместимости development версии

## Editor Config

Конфигурацию IDE или большинства редакторов кода можно задать в файле `[root]/.editorconfig`

> Для пользователей VS Code необходимо поставить расширение [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Babel

Настройки [Babel](https://babeljs.io) находятся в файле `[root]/babel.config.js`

## ESLint

Основной конфигурационный файл [ESLint](https://eslint.org/) находятся в файле `[root]/.eslintrc`.

Артефакты правил находятся в директории `[root]/configurations/eslint`:
* Для JS - `[root]/configurations/eslint/js.eslint.json`
* Для TS - `[root]/configurations/eslint/ts.eslint.json`
* Для React - `[root]/configurations/eslint/react.eslint.json`

## Prettier

Конфигурация [Prettier](https://prettier.io) находится в файле `[root]/.prettierrc.json`

## PostCSS

Конфигурация [PostCSS](https://postcss.org) находится в файле `[root]/postcss.config.js`

## Stylelint

Конфигурация [stylelint](https://stylelint.io) находится в файле `[root]/.stylelint.json`
