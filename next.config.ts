const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    AUTHORITY: process.env.AUTHORITY,
    KNOWN_AUTHORITIES: process.env.KNOWN_AUTHORITIES,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
};

export default nextConfig;