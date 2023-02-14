module.exports = {
  plugin: {
    // You need to have access to the given plugin identifier on staging IAM system
    // please, try to get the permission in https://portal-dh-euw-stg-vt.deliveryhero.io/de/p/dhh-iam#/users or ask for access to the ops portal team
    identifier: 'ops-portal-billing-view',
    name: 'Billing View',
    route: '/billing-view',
    description: 'Billing View is a reconciliation dashboard that provides users with the transparency on how many orders were sent to SAP, billable, receiptable, etc',
    type: 'PLUGIN_TYPE_INTERNAL', // PLUGIN_TYPE_INTERNAL or PLUGIN_TYPE_STANDALONE,
    portalVersion: 'v1', //used for mock API server and in the deploy tool. Currently there is only version v1!
    category: 'Portal', // choose an existing Category name
    menu_icon: 'AspectRatio', // choose an icon name from https://material-ui.com/components/material-icons/
    ownerEmail: 'pd-billing-portal@deliveryhero.com',
    team: 'pandora-billing-portal',
    repositoryUrl: 'https://github.com/deliveryhero/pd-billing-view',
    documentationUrl: 'https://docs.google.com/document/d/1u9ryHAvvnLRJoduc18g6UrPnCqzwuXqXSpgHPewGkOQ/edit#heading=h.fsm1l96g7pa0',
    support: '#pd-co-billing-portal',
    tokenType: "TOKEN_TYPE_FULL",
    isAccessibleGlobally: false
  },
  build: {
    entryFile: './src/index.tsx',
    outputDir: 'dist/',
    outputFileName: 'your-plugin.[chunkhash].js',
    libraryName: 'YourPlugin',
    webpackManifestFileName: 'your-plugin-manifest.json'
  },
  settings: {
    useConfig: false, // set to false to disable the plugin configuration. json files are by convention in folder `config`
    brand: "Delivery_Hero", // brand in development environment. possible values: Delivery_Hero eFood Foodpanda Talabat Hungerstation Mjam Pedidosya Yemeksepeti
    useProfiler: false,
    title: "Ops Portal",
    region: "europe",
  }
};
