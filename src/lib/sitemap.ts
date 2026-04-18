/**
 * Sitemap Generator
 * Generates XML sitemap for search engines
 */

export function generateSitemap(): string {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
    { url: '/login', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
    { url: '/signup', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
    { url: '/terms-and-conditions', priority: '0.5', changefreq: 'monthly', lastmod: currentDate },
    { url: '/privacy-policy', priority: '0.5', changefreq: 'monthly', lastmod: currentDate },
    { url: '/contact', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
    { url: '/events', priority: '0.6', changefreq: 'weekly', lastmod: currentDate }
  ];

  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>';

  const urls = pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  return xmlHeader + urlsetOpen + urls + '\n' + urlsetClose;
}

/**
 * Robots.txt Generator
 */
export function generateRobotsTxt(): string {
  const baseUrl = window.location.origin;
  
  return `# Gold X Usdt - Robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /profile/
Disallow: /wallets/
Disallow: /transactions/
Disallow: /deposit/
Disallow: /withdrawal/
Disallow: /referrals/
Disallow: /support/

# Crawl-delay
Crawl-delay: 10

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /
`;
}
