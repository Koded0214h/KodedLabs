/**
 * Postbuild prerender script.
 * Serves the dist folder, visits each route with a headless browser,
 * and writes the fully-rendered HTML back to disk — so crawlers get
 * real content instead of an empty <div id="root">.
 *
 * Run automatically via:  npm run build  (calls vite build && node scripts/prerender.mjs)
 */

import { chromium } from 'playwright'
import { createServer } from 'http'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'
import handler from 'serve-handler'

const DIST   = resolve(process.cwd(), 'dist')
const PORT   = 4999
const ROUTES = [
  { route: '/',       file: 'index.html'  },
  { route: '/status', file: 'status.html' },
]

// Minimal static file server over dist/
const server = createServer((req, res) =>
  handler(req, res, { public: DIST, cleanUrls: true })
)

await new Promise(r => server.listen(PORT, r))
console.log(`[prerender] serving dist on :${PORT}`)

const browser = await chromium.launch()
const page    = await browser.newPage()

for (const { route, file } of ROUTES) {
  const url      = `http://localhost:${PORT}${route}`
  const outPath  = join(DIST, file)

  await page.goto(url, { waitUntil: 'networkidle' })

  // Give React one extra tick to flush any deferred state
  await page.waitForTimeout(200)

  const html = await page.content()
  writeFileSync(outPath, html, 'utf8')
  console.log(`[prerender] ✓ ${route} → dist/${file}`)
}

await browser.close()
server.close()
console.log('[prerender] done')
