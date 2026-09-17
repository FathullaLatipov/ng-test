# JIB (ВМПЗ) — страница направления «Производство»

**Дата:** 2026-09-17
**Статус:** одобрено пользователем

## Цель
В направлении бизнеса «Производство» раскрыть завод **J.I.B. INVEST / Волгодонский
маслоперерабатывающий завод (ВМПЗ)**. Данные и медиа взяты с https://www.vmpz.pro/.
Контент — редактируемый через CMS/админку.

## Решения (согласованы)
- **Формат:** отдельная страница `/business/jib`.
- **Медиа:** реальные файлы с vmpz.pro, сохранены в `src/assets/jib/`.
- **CMS:** контент редактируется в `/admin` (вкладка «J.I.B. / Завод»).

## Медиа (`src/assets/jib/`)
- `logo.svg` — логотип J.I.B. (эмблема-подсолнух + вордмарк)
- `field.jpg` — подсолнечное поле → фон hero
- `oil-bottles.jpg` — бутылки «Семейное» + подсолнух → секция «О заводе»
- `meal.jpg` — жмых в пиале → побочные продукты
- `mark-semeynoe.png`, `mark-donchanka.png`, `mark-donola.png` — бутылки марок

## Структура страницы `JibPage`
1. Hero (логотип, заголовок, подзаголовок, фон = field.jpg, хлебные крошки)
2. Ключевые цифры (27 лет · 48+ стран · 200+ сотрудников · 100+ ед. транспорта)
3. О заводе (текст + миссия + фото oil-bottles.jpg)
4. История (timeline: 1998 → 2003 → 2011 → сегодня)
5. Продукция — марки (Семейное, Дончанка, Donola) + побочные (жмых, пеллеты, соапсток)
6. Производственные возможности (фасовка ПЭТ 1/5 л, канистры/флекситанки, налив ж/д и авто, OEM)
7. Качество (ТР ТС 024/2011, ГОСТ 1129-2013, без ГМО/сои/пальмы)
8. CTA → /partnership#partner-form + ссылка на vmpz.pro

## CMS-модель (`types.ts` → `CmsData.jib`)
```
jib: {
  eyebrow, title, titleAccent, heroSubtitle, heroImage, logoUrl,
  aboutTitle, about, mission, aboutImage,
  stats: StatItem[],
  history: JibHistoryItem[]  // { id, year, title, desc, order }
  productsTitle, products: JibProduct[]  // { id, name, note, img, order }
  byproducts: string[],
  capabilitiesTitle, capabilities: string[],
  standardsTitle, standards: string[],
  website, websiteLabel,
}
```
`DirectionItem` получает опциональное поле `detailTo?: string`.

## Затрагиваемые файлы
- `src/app/cms/types.ts` — типы `JibHistoryItem`, `JibProduct`, ключ `jib`, `DirectionItem.detailTo`
- `src/app/cms/defaults.ts` — импорт ассетов + `DEFAULT_CMS.jib` + `detailTo` у production
- `src/app/cms/store.ts` — слияние `jib` в `mergeCms` (fallback для массивов)
- `src/app/pages/JibPage.tsx` — новая страница (новый файл)
- `src/app/App.tsx` — маршрут `/business/jib`
- `src/app/components/BusinessDirections.tsx` — ссылка «Подробнее» через `detailTo` (fallback по id=production)
- `src/app/pages/AdminPage.tsx` — вкладка «J.I.B. / Завод» + поле `detailTo` в `DirectionEditor`

## Устойчивость
- `mergeCms` подставляет `jib` из дефолтов, если сервер вернул старые данные без него.
- Ссылка на карточке «Производство» работает даже без `detailTo` в данных сервера
  (fallback `dir.id === "production" → /business/jib`).
