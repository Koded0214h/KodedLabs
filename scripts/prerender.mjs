/**
 * Postbuild prerender script.
 * Uses Vite's SSR loader to render each entry into the built HTML shell,
 * which keeps SEO-friendly markup without requiring a headless browser.
 */

import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { createServer } from 'vite'

const TODAY = new Date().toISOString().split('T')[0]

const DIST = resolve(process.cwd(), 'dist')
const ROUTES = [
  { entry: '/src/App.jsx',       file: 'index.html'  },
  { entry: '/src/StatusApp.jsx', file: 'status.html' },
]

function stampTheme(html, theme = 'dark') {
  return html.replace(/<html([^>]*)>/, (_match, attrs) => {
    if (attrs.includes('data-theme=')) {
      return `<html${attrs.replace(/data-theme="[^"]*"/, `data-theme="${theme}"`)}>`
    }
    return `<html${attrs} data-theme="${theme}">`
  })
}

function injectMarkup(html, markup) {
  return html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
}

const vite = await createServer({
  appType: 'custom',
  server: {
    middlewareMode: true,
    ws: false,
    watch: null,
  },
})

try {
  for (const { entry, file } of ROUTES) {
    const mod = await vite.ssrLoadModule(entry)
    const markup = renderToString(createElement(mod.default))
    const outPath = join(DIST, file)
    const html = readFileSync(outPath, 'utf8')

    writeFileSync(
      outPath,
      injectMarkup(stampTheme(html), markup),
      'utf8'
    )

    console.log(`[prerender] ✓ ${entry} → dist/${file}`)
  }

  const sitemapPath = join(DIST, 'sitemap.xml')
  const sitemap = readFileSync(sitemapPath, 'utf8')
  writeFileSync(sitemapPath, sitemap.replaceAll('BUILD_DATE', TODAY), 'utf8')
  console.log(`[prerender] ✓ sitemap.xml lastmod → ${TODAY}`)
  console.log('[prerender] done')
} finally {
  await vite.close()
}
