import {IOpsSdk, createPluginHistory} from '@deliveryhero/opsportal';
import React, {useEffect} from 'react';
import {Router, Route, Switch} from "react-router-dom";
import Intro from "@src/Intro";
import {I18nextProvider} from 'react-i18next';
import styled from 'styled-components';
import { Box } from '@deliveryhero/armor';

const Wrapper = styled(Box)`
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const App: React.FC<{ baseApi: IOpsSdk }> = ({baseApi}) => {
    useEffect(() => {
        // tell the portal that the plugin is ready, alternatively call this method after the initial HTTP call
        baseApi.setPluginLoaded();
    }, []);

    return (
        <Wrapper>
            <I18nextProvider i18n={baseApi.getI18nInstance()}>
                <Router history={createPluginHistory(baseApi)}>
                    <Switch>
                        <Route path="/" render={() => <Intro baseApi={baseApi}/>} exact />
                    </Switch>
                </Router>
            </I18nextProvider>
        </Wrapper>
    );
};

export default App;
