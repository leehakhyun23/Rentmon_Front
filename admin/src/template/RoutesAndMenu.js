import React from "react";
import UserPage from "../components/member/UserPage";
import HostPage from "../components/member/HostPage";
import DeclarationPage from "../components/declaration/DeclarationPage";
import DeclarationView from "../components/declaration/DeclarationView";
import CouponPage from "../components/coupon/CouponPage";
import CouponModal from "../components/modal/CouponModal";
import { IconGiftCard, IconHome, IconReport, IconUser, IconUserFilled, IconUsers } from '@tabler/icons-react';
import DashBoard from "../components/dashboard/DashBoard";
import Chat from "../test/Chat";
import TossPayment from "../test/TossPayment";

const RoutesAndMenu = [
  {
    id: "dashboard",
    title: "DashBoard",
    url: "/",
    icon: IconHome,
    element: <DashBoard />,
  },
  {
    id: "member",
    title: "회원관리",
    icon: IconUsers,
    subMenu: [
      {
        id: "userpage",
        title: "유저관리",
        url: "/userpage",
        icon: IconUser,
        element: <UserPage />,
      },
      {
        id: "hostpage",
        title: "호스트(공간)관리",
        url: "/hostpage",
        icon: IconUserFilled,
        element: <HostPage />,
      },
    ],
  },
  {
    id: "declaration",
    title: "신고관리",
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
    title: "쿠폰관리",
    url: "/couponpage",
    icon: IconGiftCard,
    element: <CouponPage />,
  },
  {
    id: "couponmodal",
    title: "Coupon Modal",
    element: <CouponModal />,
  },
  {
    id: "chat",
    title: "Chat",
    element: <Chat />,
  },
  {
    id: "tosspayment",
    title: "Toss Payment",
    element: <TossPayment />,
  },
];

export default RoutesAndMenu;
