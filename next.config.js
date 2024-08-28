module.exports = {
  async rewrites() {
    return [
      {
        source: '/piarts',
        destination: '/piarts',
      },
      {
        source: '/piarts/ayarlar',
        destination: '/piarts/settings',
      },
      {
        source: '/piarts/slide',
        destination: '/piarts/slide',
      },
      {
        source: '/piarts/sayfalar',
        destination: '/piarts/page',
      },
      {
        source: '/piarts/kullanicilar',
        destination: '/piarts/users',
      },
      {
        source: '/piarts/yetkiler',
        destination: '/piarts/authority',
      },
      {
        source: '/piarts/belgeler',
        destination: '/piarts/document',
      },
      {
        source: '/piarts/entegrasyonlar',
        destination: '/piarts/integration',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/piarts',
        permanent: false,
      },
    ];
  },
};
