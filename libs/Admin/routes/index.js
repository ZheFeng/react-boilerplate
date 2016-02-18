const routes = [
  {
    path: '/',
    getComponent(location, callback) {
      require.ensure([], (require) => {
        callback(null, require('../components/Root').default);
      });
    },
    getIndexRoute(location, callback) {
      require.ensure([], (require) => {
        callback(null, require('./home').default);
      });
    },
    getChildRoutes(location, callback) {
      require.ensure([], (require) => {
        callback(null, [
          require('./moduleA').default,
          require('./moment').default,
        ]);
      });
    },
  },
];

export default routes;
