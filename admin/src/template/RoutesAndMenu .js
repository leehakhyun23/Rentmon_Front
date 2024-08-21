import React from 'react';
import UserPage from './../components/member/UserPage';
import HostPage from '../components/member/HostPage';
import DeclarationPage from '../components/declaration/DeclarationPage';

const RoutesAndMenu  = () => {
    const routesAndMenu = [
        {
            id: "userPage",
            title: "예약",
            url: "/userpage",
            // icon: IconCalendarTime,
            authorities: ["ADMIN"],
            element: <UserPage />,
        },
        {
            id: "hostPage",
            title: "예약",
            url: "/hostpage",
            // icon: IconCalendarTime,
            authorities: ["ADMIN"],
            element: <HostPage />,
        },
        {
            id: "declarationPage",
            title: "예약",
            url: "/declarationpage",
            // icon: IconCalendarTime,
            authorities: ["ADMIN"],
            element: <DeclarationPage />,
        },
    ];

    return (
        <div>
            
        </div>
    );
};

export default RoutesAndMenu ;