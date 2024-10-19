import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: "https://pokeapiclone.pascalbouwhuis.nl/v1/graphql",
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
