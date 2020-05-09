import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { GRAPHQL_API_URL } from 'react-native-dotenv';

import Firebase from './firebase';

const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      Authorization: `Bearer ${await Firebase.auth().currentUser.getIdToken()}`,
    },
  };
});

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: asyncAuthLink.concat(httpLink),
});
