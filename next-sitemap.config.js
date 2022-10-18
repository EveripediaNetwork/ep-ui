
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_DOMAIN,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {userAgent: '*', disallow: '/admin'},
            {userAgent: '*', allow: '/'}
        ]
    },
    exclude: ['/admin']
}