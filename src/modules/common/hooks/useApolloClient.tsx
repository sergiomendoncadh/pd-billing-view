import React from 'react';
import { IOpsSdk } from '@deliveryhero/opsportal';
import { initApollo } from '../../../client';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createMemoryHistory } from 'history';

export const useApolloClient = (baseApi: IOpsSdk) => {
  const history = createMemoryHistory();
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject>>(() =>
    initApollo(baseApi, history)
  );

  React.useEffect(() => {
    //create new client when a new country is selected.
    baseApi.onCountryChange(() => {
      setClient(initApollo(baseApi, history));
    });
  }, [baseApi]);

  return client;
};
