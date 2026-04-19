import { common } from '@/app/config/content';
import { NextResponse } from 'next/server';
import proxy from '@/proxy';

export async function GET(request) {
  const authResponse = await proxy(request);
  if (authResponse.status !== 200) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return new NextResponse(common.errors.domainRequired, { status: 400 });
  }

  const providers = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  ];
  
  for (const url of providers) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 86400 }
      });
      
      if (res.ok && res.status !== 404) {
        const contentType = res.headers.get('Content-Type');
        const buffer = await res.arrayBuffer();

        return new NextResponse(buffer, {
          headers: {
            'Content-Type': contentType || 'image/png',
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
          },
        });
      }
    } catch (e) {
      continue;
    }
  }

  return new NextResponse(null);
}

