import React from 'react';
import RoutesAndMenu from './RoutesAndMenu ';

const MainRoutes  = {
    path: "/",
    element: <MainLayout />,
    children: RoutesAndMenu.map(route => ({
    path: route.url.replace("/", ""),
    element: route.authorities ? (
      <AccessAllow authorities={route.authorities}>
        {route.element}
      </AccessAllow>
    ) : (
      route.element
    ),
  })),
};

export default MainRoutes ;