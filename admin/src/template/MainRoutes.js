import Login from '../components/login/Login';
import RoutesAndMenu from './RoutesAndMenu';

const loginRoute = {
  path: "login",
  element: <Login />,
};

const mapRoutes = (routes) => {
  return routes.flatMap(route => {
    const mainRoute = {
      path: route.url?.replace("/", ""),
      element: route.element,
    };

    if (route.subMenu) {
      return [mainRoute, ...mapRoutes(route.subMenu)];
    } else {
      return mainRoute;
    }
  });
};

const MainRoutes = mapRoutes(RoutesAndMenu);

export { loginRoute, MainRoutes };
