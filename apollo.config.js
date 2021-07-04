module.exports = {
  client: {
    includes: ["./**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      // uri: "https://nomadcoffee-henry.loca.lt/graphql",
      url: "http://localhost:4000/graphql",
    },
  },
};
