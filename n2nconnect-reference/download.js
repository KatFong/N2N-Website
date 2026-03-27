#!/usr/bin/env node
/**
 * Download n2nconnect.com website assets
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const BASE_URL = 'https://www.n2nconnect.com';
const OUT_DIR = path.join(__dirname, 'site');
const visited = new Set();
const queue = ['/'];

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
};

function fetch(urlStr) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const mod = u.protocol === 'https:' ? https : http;
    const req = mod.get(urlStr, { headers: HEADERS }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : BASE_URL + res.headers.location;
        return resolve(fetch(redirectUrl));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, type: res.headers['content-type'] || '', data: Buffer.concat(chunks) }));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function urlToFilePath(urlPath) {
  let p = urlPath.split('?')[0].split('#')[0];
  if (p.endsWith('/')) p += 'index.html';
  if (!path.extname(p)) p += '.html';
  return path.join(OUT_DIR, p);
}

function extractLinks(html, baseUrl) {
  const links = new Set();
  const patterns = [
    /href=["']([^"']+)["']/gi,
    /src=["']([^"']+)["']/gi,
    /url\(["']?([^"')]+)["']?\)/gi,
    /@import\s+["']([^"']+)["']/gi,
  ];
  for (const pat of patterns) {
    let m;
    while ((m = pat.exec(html)) !== null) {
      try {
        const resolved = new URL(m[1], baseUrl).href;
        if (resolved.startsWith(BASE_URL)) {
          links.add(resolved);
        }
      } catch {}
    }
  }
  return links;
}

async function downloadAsset(url) {
  if (visited.has(url)) return;
  visited.add(url);

  try {
    const u = new URL(url);
    const filePath = urlToFilePath(u.pathname);

    if (fs.existsSync(filePath)) return;

    process.stdout.write(`  ↓ ${u.pathname}\n`);
    const { status, type, data } = await fetch(url);

    if (status !== 200) return;

    ensureDir(filePath);
    fs.writeFileSync(filePath, data);

    // If HTML or CSS, extract more links
    if (type.includes('text/html') || type.includes('text/css')) {
      const text = data.toString('utf8');
      const links = extractLinks(text, url);
      for (const link of links) {
        if (!visited.has(link)) queue.push(link);
      }
    }
  } catch (e) {
    process.stdout.write(`  ✗ ${url} — ${e.message}\n`);
  }
}

// Pages to explicitly download
const PAGES = [
  '/',
  '/index.html',
  '/about.html',
  '/trading-solution.html',
  '/information-terminal.html',
  '/wealth.html',
  '/algorithmic-trading.html',
  '/market-maker.html',
  '/ath.html',
  '/aeb.html',
  '/contact-us.html',
  '/press-release.html',
  '/investor-relation.html',
  '/career.html',
];

async function main() {
  console.log('🌐 Downloading n2nconnect.com to ./site/\n');
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Seed queue with all known pages
  for (const p of PAGES) queue.push(BASE_URL + p);

  let i = 0;
  while (queue.length > 0) {
    const url = queue.shift();
    if (!url.startsWith(BASE_URL)) continue;
    await downloadAsset(url);
    i++;
    if (i % 10 === 0) console.log(`  [${i} processed, ${queue.length} queued, ${visited.size} visited]`);
    await new Promise(r => setTimeout(r, 200)); // polite delay
  }

  console.log(`\n✅ Done! Downloaded ${visited.size} files to ${OUT_DIR}`);
}

main().catch(console.error);
