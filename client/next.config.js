module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080"}/:path*`, // Proxy to Backend
      },
    ];
  },
};
