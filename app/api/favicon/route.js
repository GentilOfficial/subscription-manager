import proxy from '@/proxy';
import { NextResponse } from 'next/server';

const POSITIVE_TTL = 1000 * 60 * 60 * 24;
const NEGATIVE_TTL = 1000 * 60 * 60;
const FETCH_TIMEOUT = 2500;

const cache = new Map();
const pending = new Map();

function extractEntity(name) {
  if (!name) return "";
  
  let clean = name.toLowerCase().trim();

  clean = clean.replace(/\([^)]*\)/g, '').trim();

  clean = clean.replace(/\s+/g, '');

  return clean.replace(/[^a-z0-9.]/g, '');
}

function getDomainCandidates(entity) {
  if (!entity) return [];
  
  if (entity.includes('.')) {
    return [entity];
  }

  return [
    `${entity}.com`,
    `${entity}.it`,
    `${entity}.net`,
    `${entity}.io`
  ];
}

async function fetchFromProvider(url) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(url, { 
      signal: controller.signal,
      next: { revalidate: 86400 } 
    });
    clearTimeout(id);

    if (!res.ok) return null;

    const buffer = await res.arrayBuffer();
    if (buffer.byteLength < 500) return null; 

    return {
      buffer: Buffer.from(buffer),
      contentType: res.headers.get('content-type') || 'image/png'
    };
  } catch (e) {
    clearTimeout(id);
    return null;
  }
}

async function fetchProviders(domain) {
  const urls = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`
  ];

  const results = await Promise.all(urls.map(u => fetchFromProvider(u)));
  return results.find(r => r !== null) || null;
}

async function resolveFavicon(name) {
  const entity = extractEntity(name);
  if (!entity) return null;

  const cached = cache.get(entity);
  if (cached && Date.now() < cached.expiry) return cached.data;

  if (pending.has(entity)) return pending.get(entity);

  const resolvePromise = (async () => {
    try {
      let result = null;
      const candidates = getDomainCandidates(entity);

      for (const domain of candidates) {
        result = await fetchProviders(domain);
        if (result) break;
      }

      cache.set(entity, {
        data: result,
        expiry: Date.now() + (result ? POSITIVE_TTL : NEGATIVE_TTL)
      });

      return result;
    } finally {
      pending.delete(entity);
    }
  })();

  pending.set(entity, resolvePromise);
  return resolvePromise;
}

export async function GET(request) {
  const authResponse = await proxy(request);
  if (authResponse.status !== 200) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || searchParams.get('domain');

  if (!name) return new NextResponse('Name/Domain required', { status: 400 });

  const icon = await resolveFavicon(name);

  if (!icon) {
    return new NextResponse(null, { 
      status: 404,
      headers: { 'Cache-Control': 'public, max-age=3600' }
    });
  }

  return new NextResponse(icon.buffer, {
    headers: {
      'Content-Type': icon.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
