import RoutesAndMenu from './RoutesAndMenu';

const MainMenu = {
  id: "menuitems",
  type: "group",
  children: RoutesAndMenu
    .filter(route => route.icon)
    .map(route => ({
      id: route.id,
      title: route.title,
      type: "item",
      url: route.url,
      icon: route.icon,
      breadcrumbs: false,
    })),
};

export default MainMenu;
