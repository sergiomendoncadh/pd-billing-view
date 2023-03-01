import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/App';
import { getOpsSdkGlobal } from '@deliveryhero/opsportal';
import manifest from '../plugin.manifest';
export default class HelloWorldPlugin {
  getPluginId() {
    return manifest.plugin.identifier;
  }

  /**
   * getPluginComponent() - for plugins of type `internal`
   */
  getPluginComponent() {
    return App;
  }

  /**
   * attachPluginToNode() - for plugins of type `standalone`
   */
  attachPluginToNode(node: HTMLElement) {
    const sdk = getOpsSdkGlobal();
    ReactDOM.render(<App baseApi={sdk} />, node);
  }
}
