import Root from '../components/Root';
import Home from '../components/Home';
import ModuleA from '../components/ModuleA';
import Moment from '../components/Moment';

const routes = [
  {
    path: '/',
    component: Root,
    indexRoute: { component: Home },
    childRoutes: [
      { path: 'moduleA', component: ModuleA },
      { path: 'moment', component: Moment },
    ],
  },
];

export default routes;
