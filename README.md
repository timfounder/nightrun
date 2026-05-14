# YURGO — Night Running Tashkent

Лендинг закрытого night-running комьюнити Ташкента. Без сборщика: статичный
`index.html` + `styles.css` + `app.js`, деплоится на GitHub Pages.

## Стек

- HTML / CSS / JS без фреймворков
- Google Fonts (Bebas Neue, Inter, JetBrains Mono)
- PWA-манифест + SVG-иконки
- Деплой через GitHub Actions → GitHub Pages

## Локальный запуск

```bash
python3 -m http.server 8080
# или
npm run serve
```

Открой <http://localhost:8080>.

## Проверки

```bash
npm install
npm run check   # prettier + stylelint + html-validate
npm run format  # автоформатирование
```

## Структура

```
index.html               разметка
styles.css               стили
app.js                   i18n, countdown, drawer, lightbox, cursor, parallax
manifest.webmanifest     PWA
favicon.svg / icon-*.svg иконки (можно заменить на PNG)
robots.txt / sitemap.xml SEO
.github/workflows/       CI и деплой
```

## Деплой

Каждый push в `main` поднимает GitHub Pages через `.github/workflows/pages.yml`.
В настройках репозитория должен быть выбран source = «GitHub Actions».

## Расписание забегов

Расписание задаётся одной константой в `app.js`:

```js
const RUN_SCHEDULE = [
  { dayOfWeek: 3, hour: 21, minute: 0 }, // среда 21:00
  { dayOfWeek: 6, hour: 21, minute: 0 }  // суббота 21:00
];
```

Время указывается по Ташкенту (UTC+5). Меняй массив — countdown пересчитается
сам.

## Ассеты

Положи в корень:

- `og.jpg` — баннер 1200×630 для превью при шеринге
- `runner.jpg` (опционально) — фото для hero, путь подключается в `app.js`
  через `HERO_PHOTO_URL`

Бесплатные источники фото: [Unsplash](https://unsplash.com),
[Pexels](https://pexels.com), [Pixabay](https://pixabay.com) — без обязательной
атрибуции, можно использовать коммерчески. Для hero ищи тёмный/ночной фон,
силуэт бегуна или motion-blur, минимум 1500×1000 px.

## Языки

`ru` / `uz` / `en` — все строки в объекте `translations` в `app.js`. Элементы в
разметке помечены атрибутом `data-i18n="<key>"`.

## Лицензия

MIT — см. `LICENSE`.
