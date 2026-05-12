# 🌑 YURGO — Night Running Tashkent

Премиум-сайт для night-running комьюнити Ташкента. Тёмная тема, кислотный акцент, анимированный hero, интерактивная карта маршрутов, рейтинг бегунов с личным кабинетом, прозрачный отчёт по благотворительности.

## ✨ Что есть

- **Hero** с HUD-наложением и атмосферным фоном города
- **Live-счётчик** до ближайшего забега + полоса заполняемости с +1 анимациями
- **Прозрачный отчёт** по благотворительности (история переводов с пруфами)
- **Карта Ташкента** с 4 маршрутами — анимация "рисования" трассы
- **Лидерборд** с подиумом и личными кабинетами бегунов
- **Галерея с lightbox** — клик по картинке открывает её на весь экран
- **Многоязычность** RU / UZ / EN
- **Кастомный курсор** на десктопе, **burger-меню** на мобилке
- **Haptic feedback** на мобилках (лёгкая вибрация на CTA)
- **PWA-манифест** + Open Graph мета-теги
- **Адаптив** под 3 брейкпоинта (планшет, телефон, маленький телефон)
- Уважение `prefers-reduced-motion`

## 📁 Структура

```
yurgo/
├── index.html          # Главная страница
├── css/
│   └── styles.css      # Все стили
├── js/
│   └── app.js          # Все скрипты
├── assets/             # Сюда положить фото
│   └── runner.jpg      # (опционально) фото бегуна для hero
├── README.md
└── LICENSE
```

## 🚀 Локальный запуск

Просто открой `index.html` в браузере. Без сборщиков, без npm, без билда — чистый HTML/CSS/JS.

Для нормальной работы fetch и некоторых API лучше через локальный сервер:

```bash
# Python 3
python3 -m http.server 8000

# или Node.js (если установлен http-server)
npx http-server

# или VS Code Live Server (расширение)
```

Открой `http://localhost:8000`.

## 🌐 Деплой

### GitHub Pages
1. Запушь в репозиторий `username/yurgo` (главная ветка `main`)
2. Settings → Pages → Source: `Deploy from a branch` → `main` → `/ (root)`
3. Сайт будет доступен по `https://username.github.io/yurgo/`

### Vercel
1. Подключи репозиторий на vercel.com
2. Framework Preset: `Other`
3. Build Command: `(пусто)`
4. Output Directory: `(пусто)`
5. Deploy

### Netlify
1. Перетащи папку на netlify.com или подключи GitHub
2. Build Command: `(пусто)`
3. Publish Directory: `(пусто)`

### Свой домен (yurgo.uz)
- В DNS-провайдере добавь A-запись `185.199.108.153` (для GitHub Pages) или CNAME на `username.github.io`
- В GitHub: Settings → Pages → Custom domain: `yurgo.uz`
- Включи `Enforce HTTPS`

## ⚙️ Кастомизация

### 1. Telegram-бот
Найди в `index.html`:
```html
<a href="https://t.me/yurgo_bot" ...>
```
Замени на свой бот.

### 2. Фото в hero
Открой `js/app.js`, найди:
```js
const HERO_PHOTO_URL = ''; // пусто = атмосферный fallback
```
Поставь путь:
```js
const HERO_PHOTO_URL = 'assets/runner.jpg';
// или внешний URL
const HERO_PHOTO_URL = 'https://images.unsplash.com/photo-...';
```

**Где взять фото бесплатно:**
- [Unsplash](https://unsplash.com/s/photos/night-running) — поиск "night running", "running silhouette"
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

Рекомендация: тёмный фон, силуэт/мотион-блюр, ≥1500px по ширине, горизонтальная ориентация.

### 3. Расписание забегов
В `index.html` найди секцию с `id="schedule"` или класс `.schedule-list` и обнови даты/маршруты.

### 4. Лидерборд
В `index.html` секция `id="rating"` — отредактируй строки `.lb-row`.
В `js/app.js` объект `profiles = {...}` — синхронизируй данные для модальных окон.

### 5. Отчёт по благотворительности
В `index.html` блок `id="charity"` — обнови `.timeline-row` с реальными переводами.

### 6. Цвета и шрифты
В `css/styles.css` сверху:
```css
:root{
  --bg: #050505;       /* фон */
  --acid: #d4ff00;     /* акцентный кислотный */
  --ink: #f5f5f0;      /* основной текст */
  --sodium: #ff9d3d;   /* оранжевый акцент (фонари) */
  /* ... */
}
```

### 7. OG-картинка для шеринга
Создай картинку 1200×630 (баннер для TG/WhatsApp/Twitter превью) и положи в `assets/og.jpg`. В `index.html` замени:
```html
<meta property="og:image" content="https://yurgo.uz/og.jpg" />
```

## 🛠️ Что заменить перед запуском

- [ ] `https://t.me/yurgo_bot` — реальный бот регистрации
- [ ] `https://t.me/yurgo` — Telegram-канал
- [ ] `https://instagram.com/yurgo` — Instagram
- [ ] `run@yurgo.uz` — email
- [ ] Расписание забегов (даты, маршруты)
- [ ] Имена в лидерборде и подиуме
- [ ] Отчёты по благотворительности (даты, фонды, суммы)
- [ ] Отзывы бегунов
- [ ] Hero-фото (`HERO_PHOTO_URL` в `js/app.js`)
- [ ] Картинки в галерее (сейчас SVG-плейсхолдеры)
- [ ] OG-картинка для соцсетей
- [ ] Иконка PWA-приложения (сейчас встроена как data-URI; для прода — отдельный favicon.svg)
- [ ] Домен `yurgo.uz` в OG-тегах и schema.org

## 📱 Адаптив

Тестировалось на:
- iPhone SE (375×667)
- iPhone 15 (390×844)
- iPad (768×1024)
- Desktop 1440×900 и шире

Брейкпоинты:
- `≤960px` — планшетная вёрстка, бургер-меню
- `≤640px` — мобильная (1 колонка везде, sticky CTA)
- `≤380px` — компактная для маленьких телефонов

## 🌍 Браузеры

- Chrome / Edge: 100%
- Safari (включая iOS): 100%
- Firefox: 100%
- Старые браузеры (IE11): не поддерживаются

## 📝 Лицензия

MIT — см. `LICENSE`. Используй, форкай, модифицируй. Шрифты Google Fonts (Bebas Neue, Inter, JetBrains Mono) — Open Font License.

---

Made with ● in Tashkent. Run the night.
