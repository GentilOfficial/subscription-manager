import site from './config/site';

export default function manifest() {
  return {
    id: '/',
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone'],
    background_color: '#09090b',

    theme_color: '#09090b',
    icons: [
      {
        src: '/icon.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}



