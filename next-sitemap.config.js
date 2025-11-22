/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.anujchhikara.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/server-sitemap-index.xml"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
