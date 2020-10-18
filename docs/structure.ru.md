[README.md](../README.ru.md) > [docs](./intro.ru.md) > Структура проекта

---

# Структура проекта

- app - Основная директория проекта
- configerations - Содержит в себе конфигурацию webpack, а так же артефакты для разного рода конфигов
- public - Директория с шаблонов для HTMLWebpackPlugin
- scripts - Скрипты сборки
- typings - Декларированные типы и модули typescript
- utils - Хелперы и утилиты, используемые при сборке проекта

## Конфигурационные файлы
- .browserlistrc - Содержит конфигурацию поддерживаемых браузеров для Babel и PostCSS
- .editorconfig - Содержит правила конфигурации файлов для IDE
- .env-cmdrc.json - Содержит конфигурации для env
- .eslinrc и .eslintignore - Конфигурация ESLint и его игнор-лист
- .prettierrc.json и .prettierignore - Конифгурация Prettier и его игнор-лист
- babel.config.js - Конфигурация Babel
- postcss.config.js - Конфигурация PostCSS
- tsconfig.json - Конфигурация TypeScript
- .stylelintrc.json - Конфигурация Stylelint
