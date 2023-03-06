import { IOpsSdk } from '@deliveryhero/opsportal';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { FORBIDDEN_ERROR } from './utils/constants';
import { ErrorTypes } from './utils/types';
import { Observable } from 'apollo-link';
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { History } from 'history';
import { getBaseUrl } from './utils/mappers';

export function initApollo(baseApi: IOpsSdk, history: History) {
  const baseUrl = getBaseUrl(baseApi) || '';
  const httpLink = createHttpLink({
    uri: baseUrl
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }: ErrorResponse): any => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          switch (err.extensions.code) {
            case ErrorTypes.FORBIDDEN:
              history.push(`/error/${FORBIDDEN_ERROR}`);
              break;
            case ErrorTypes.UNAUTHENTICATED:
              return new Observable((observer) => {
                baseApi
                  .refreshAccessToken()
                  .then(() => {
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer)
                    };
                    forward(operation).subscribe(subscriber);
                  })
                  .catch((error) => {
                    observer.error(error);
                  });
              });
          }
        }
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  );

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from ops-portal
    const token = baseApi.getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    };
  });

  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
  });
}
