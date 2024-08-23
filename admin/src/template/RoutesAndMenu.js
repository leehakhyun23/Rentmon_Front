import React from "react";
import MainPage from "../components/MainPage";
import UserPage from "../components/member/UserPage";
import HostPage from "../components/member/HostPage";
import DeclarationPage from "../components/declaration/DeclarationPage";
import DeclarationView from "../components/declaration/DeclarationView";
import CouponPage from "../components/coupon/CouponPage";
import CouponModal from "../components/modal/CouponModal";
import { IconGiftCard, IconHome, IconReport, IconUser, IconUsers } from '@tabler/icons-react';
import DashBoard from "../components/dashboard/DashBoard";

const RoutesAndMenu = [
  {
    id: "dashboard",
    title: "DashBoard",
    url: "/",
    icon: IconHome,
    element: <DashBoard />,
  },
  {
    id: "main",
    title: "Main",
    url: "/main",
    icon: IconHome,
    element: <MainPage />,
  },
  {
    id: "userpage",
    title: "User Page",
    url: "/userpage",
    icon: IconUser,
    element: <UserPage />,
  },
  {
    id: "hostpage",
    title: "Host Page",
    url: "/hostpage",
    icon: IconUsers,
    element: <HostPage />,
  },
  {
    id: "declaration",
    title: "Declaration",
    url: "/declaration",
    icon: IconReport,
    element: <DeclarationPage />,
  },
  {
    id: "declarationview",
    title: "Declaration View",
    url: "/declarationview/:dseq",
    element: <DeclarationView />,
  },
  {
    id: "couponpage",
    title: "Coupon Page",
    url: "/couponpage",
    icon: IconGiftCard,
    element: <CouponPage />,
  },
  {
    id: "couponmodal",
    title: "Coupon Modal",
    element: <CouponModal />,
  },
];

export default RoutesAndMenu;
