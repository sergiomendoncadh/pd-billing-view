import { IOpsSdk, createPluginHistory } from '@deliveryhero/opsportal';
import { Box } from '@deliveryhero/armor';
import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { useApolloClient } from '@modules/common/hooks/useApolloClient';
import { BaseApiProvider } from '@modules/common/context';
import styled from 'styled-components';
import { HomeView } from '@views/Home';

const Wrapper = styled(Box)`
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface GlobalProvidersProps {
  children: React.ReactNode;
  apolloClient: ApolloClient<unknown>;
  baseApi: IOpsSdk;
}

export const GlobalProviders: React.FC<GlobalProvidersProps> = ({
  children,
  apolloClient,
  baseApi
}: GlobalProvidersProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <BaseApiProvider baseApi={baseApi}>{children}</BaseApiProvider>
    </ApolloProvider>
  );
};

export const App: React.FC<{ baseApi: IOpsSdk; }> = ({ baseApi }) => {
  const client = useApolloClient(baseApi);

  useEffect(() => {
    // tell the portal that the plugin is ready, alternatively call this method after the initial HTTP call
    baseApi.setPluginLoaded();
  }, [baseApi]);

  return (
    <GlobalProviders apolloClient={client} baseApi={baseApi}>
      <Wrapper>
        <I18nextProvider i18n={baseApi.getI18nInstance()}>
          <Router history={createPluginHistory(baseApi)}>
            <Switch>
              <Route path='/' render={() => <HomeView baseApi={baseApi} />} exact />
            </Switch>
          </Router>
        </I18nextProvider>
      </Wrapper>
    </GlobalProviders>
  );
};

export default App;
