import RoutesAndMenu from './RoutesAndMenu';

const mapRoutesToMenuItems = (routes) => {
  return routes
    .filter(route => route.icon)
    .map(route => {
      const menuItem = {
        id: route.id,
        title: route.title,
        type: route.subMenu ? "collapse" : "item",
        url: route.url,
        icon: route.icon,
        breadcrumbs: false,
        children: route.subMenu ? mapRoutesToMenuItems(route.subMenu) : [],
      };
      return menuItem;
    });
};

const MainMenu = {
  id: "menuitems",
  type: "group",
  children: mapRoutesToMenuItems(RoutesAndMenu),
};

export default MainMenu;
