const siteUrl = process.env.NEXT_PUBLIC_DOMAIN
module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {userAgent: '*', disallow: '/admin'},
            {userAgent: '*', allow: '/'}
        ],
        additionalSitemaps: [`${siteUrl}/server-sitemap.xml/category`, `${siteUrl}/sitemap.xml`]
    },
    exclude: ['/admin']
}