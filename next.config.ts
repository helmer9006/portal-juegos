const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    NEXT_PUBLIC_AUTHORITY: process.env.NEXT_PUBLIC_AUTHORITY,
    NEXT_PUBLIC_KNOWN_AUTHORITIES: process.env.NEXT_PUBLIC_KNOWN_AUTHORITIES,
    NEXT_PUBLIC_REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
    NEXT_PUBLIC_STORAGE_BASE_URL: process.env.NEXT_PUBLIC_STORAGE_BASE_URL,
    NEXT_PUBLIC_STORAGE_SAS_TOKEN: process.env.NEXT_PUBLIC_STORAGE_SAS_TOKEN,
  },
};

export default nextConfig;