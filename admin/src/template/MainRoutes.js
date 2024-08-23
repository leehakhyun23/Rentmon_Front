import RoutesAndMenu from './RoutesAndMenu';

const MainRoutes = RoutesAndMenu.map(route => ({
  path: route.url?.replace("/", ""),
  element: route.element,
}));

export default MainRoutes;
