<div align="center">

# 🎓 TodoList Vue Typescript ESLint+Prettier

![HTML5](https://img.shields.io/badge/HTML5-Structure-orange?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Styling-blue?style=for-the-badge&logo=css3)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vue.js](https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Pinia](https://img.shields.io/badge/pinia-%23ffe05d.svg?style=for-the-badge&logo=pinia&logoColor=black)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)


**[🚀 Демо версия (Deploy)](https://webdev-frontend-todolist-typescript.vercel.app)**

</div>

---
## 📝 О проекте

Учебный проект по полной миграции веб-приложения To-Do List с JavaScript на **TypeScript**.
Основной упор сделан на строгую типизацию, настройку линтеров и автоматическое форматирование кода.

**🔗 Ссылка на предыдущую версию (JS + Pinia):** [WonderSi/webdev-frontend-todolist-pinia](https://github.com/WonderSi/webdev-frontend-todolist-pinia)

## Чек-лист выполнения

- [x] Все файлы `.js` переписаны на `.ts`
- [x] Используется Composition API `<script setup lang="ts">`
- [x] Полная типизация (нет ошибок `vue-tsc`)
- [x] Настроен **ESLint** (Flat Config) — ошибок нет
- [x] Настроен **Prettier** для автоформатирования
- [x] Реализована модульная архитектура
- [x] Приложение полностью функционирует

## 🛠️ Стек технологий
| Категория | Технологии |
|-----------|------------|
| **Core** | Vue 3, TypeScript |
| **State** | Pinia (с персистенцией) |
| **Styles** | SCSS |
| **Tools** | Vite, ESLint, Prettier |

## 📂 Архитектура
```
src/
├─ assets/
│ ├─ fonts/
│ ├─ img/
│ └─ svg/
├─ components/
├─ page/
├─ router/
├─ scss/
├─ stores/
├─ utils/
│ └─ validation/
├─ App.vue
└─ main.ts
.gitignore
.prettierignore
.prettierrc.json
env.d.ts
eslint.config.js
index.html
package.json
README.md
tsconfig.json
vite.config.ts
```

## Установка / Запуск

### 1. Клонирование
```
git clone https://github.com/WonderSi/webdev-frontend-todolist-typescript.git
cd webdev-frontend-todolist-typescript
```
### 2. Установка зависимостей (yarn)
```
yarn install
```
### 3. Проверка кода (Listener & Formst)
```
yarn lint
yarn format
```
### 4. Запуск dev-сервер:
```
yarn dev
```
Приложение будет доступно по адресу: `http://localhost:5173`

---
<div align="center">

**Выполнил:** Козлов Кирилл (ФИТ-231) <br/>
Study Project 2025

</div>










