module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`, // Proxy to Backend
      },
    ];
  },
};
