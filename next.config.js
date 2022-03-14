module.exports = {
    reactStrictMode: true,
    ignoreDuringBuilds: true,
    swcminify: false,
    images: {
        domains: ["http://158.255.74.155:9000/images/:id*", "158.255.74.155"],
    },
    async rewrites() {
        return [
            {
                source: "/v1/:path*",
                destination: "http://158.255.74.155:4402/v1/:path*",
            },
        ];
    },
};
