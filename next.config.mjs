/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    },
    experimental: {
    serverComponentsExternalPackages: ["@prisma/client"]
  }
};

export default nextConfig;
