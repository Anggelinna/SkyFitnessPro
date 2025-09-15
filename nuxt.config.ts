module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fitnes/main",
        permanent: true,
      },
    ];
  },
};