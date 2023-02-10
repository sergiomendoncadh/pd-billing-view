/**
 * @jest-environment jsdom
 */
import {CountryDefinition, IOpsSdk} from "@deliveryhero/opsportal";
import React from 'react';
import {render} from "@testing-library/react";
import App from "./App";
import {Callback} from "@deliveryhero/opsportal/src/types";
import I18nextProvider from "i18next";

const mockAuthProxy = (url: string, data: object, method: string, headers: object): Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve({});
    });
};

const baseApiMock = {
    setPluginLoaded: () => null,
    getUserName: () => "tester",
    getUser: () => {
        return {name: "tester", email: "tester@example.org", authSchema: {}, scopes: []};
    },
    getPlugins: () => [],
    getCountries: () => [],
    getAccessToken: () => "token1234",
    getCountry: () => { return { code: "TE", name: "Testland", currencyCode: "EUR"} as CountryDefinition},
    onCountryChange: (cb: Callback) => {
    },
    call: mockAuthProxy,
    portal: {
        switchPlugin: (id: string) => null,
        pluginUrl: {
            get: () => "/",
            set: (url: string|null) => { return; },
        }
    },
    getI18nInstance: () => I18nextProvider
} as unknown as IOpsSdk;

it('Renders the Plugins App component', () => {
    const {container} = render(<App baseApi={baseApiMock} />);
    expect(container).toMatchSnapshot();
});
