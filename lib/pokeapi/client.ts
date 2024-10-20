import { ApolloClient, InMemoryCache } from "@apollo/client";
import type { DefaultOptions } from "@apollo/client";

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
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
