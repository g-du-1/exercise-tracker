module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080"}/api/:path*`, // Proxy to Backend
      },
    ];
  },
};
