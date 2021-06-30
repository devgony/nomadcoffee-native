import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import {
  offsetLimitPagination,
  relayStylePagination,
} from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
const TOKEN = "token";

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar("");
};

const uploadHttpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql",
// });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchCoffeeShops: offsetLimitPagination(),
        seeCoffeeShops: {
          keyArgs: false,
          merge(existing = {}, incoming = {}) {
            return {
              ...incoming,
              coffeeShops: [
                ...(existing.coffeeShops || []),
                ...incoming.coffeeShops,
              ],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});
export default client;
