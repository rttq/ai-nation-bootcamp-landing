// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ai-nation.ru',
  output: 'static',
  // Лендинг живёт в /dev/, как на боевом сайте
  redirects: { '/': '/dev/' },
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Стили вшиты в HTML: у части читателей из России запрос за отдельной таблицей стилей обрывался
    inlineStylesheets: 'always',
  },
  vite: { build: { assetsInlineLimit: 1024 } },
});
