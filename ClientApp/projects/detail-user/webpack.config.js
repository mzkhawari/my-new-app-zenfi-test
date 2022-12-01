const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'detail-user',

  exposes: {
    './Module': './projects/detail-user/src/app/user-info/detailuser.module.ts',
    './Component': './projects/detail-user/src/app/user-info/component/user-info.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
