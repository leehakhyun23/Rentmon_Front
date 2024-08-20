// import React, { useState, useEffect, useRef } from 'react';
// import '../css/submenu.css';

// function Submenu() {
//     const [isOpen, setIsOpen] = useState(false);
//     const subBarRef = useRef(null);

//     useEffect(() => {
//         const subBar = subBarRef.current;
//         let i = isOpen ? 0 : 120;
//         let _up, _down;
//         const framerate = 120 / 1000;

//         const up = () => {
//             subBar.style.height = `${i++}px`;
//             if (i > 120) {
//                 clearInterval(_up);
//             }
//         };

//         const down = () => {
//             subBar.style.height = `${i--}px`;
//             if (i < 0) {
//                 clearInterval(_down);
//             }
//         };

//         if (isOpen) {
//             clearInterval(_down);
//             _up = setInterval(up, framerate);
//         } else {
//             clearInterval(_up);
//             _down = setInterval(down, framerate);
//         }

//         return () => {
//             clearInterval(_up);
//             clearInterval(_down);
//         };
//     }, [isOpen]);

//     return (
//         <article>
//             <div className="menu" onClick={() => setIsOpen(!isOpen)}>
//                 <span>Menu</span>
//                 <ul className="sub" ref={subBarRef}>
//                     <li><a href="#None">Home</a></li>
//                     <li><a href="#None">예약/캘린더</a></li>
//                     <li><a href="#None">후기/Q&A</a></li>
//                     <li><a href="#None">공간관리</a></li>
//                     <li><a href="#None">1:1문의</a></li>
//                     <li><a href="#None">공지사항</a></li>
//                     <li><a href="#None">운영지표</a></li>
//                     <li><a href="#None">정산</a></li>
//                 </ul>
//             </div>
//         </article>
//     );
// }

// export default Submenu;


import React, { useRef, useState } from 'react';
import '../css/submenu.css';

function Submenu() {
  const [isOpen, setIsOpen] = useState(false);
  const subBarRef = useRef(null);

  return (
    <div className="menu" onClick={() => setIsOpen(!isOpen)}>
      <span>Menu</span>
      <ul className={`sub ${isOpen ? 'open' : ''}`} ref={subBarRef}>
        <li><a href="#None">Home</a></li>
        <li><a href="#None">예약/캘린더</a></li>
        <li><a href="#None">후기/Q&A</a></li>
        <li><a href="#None">공간관리</a></li>
        <li><a href="#None">1:1문의</a></li>
        <li><a href="#None">공지사항</a></li>
        <li><a href="#None">운영지표</a></li>
        <li><a href="#None">정산</a></li>
      </ul>
    </div>
  );
}

export default Submenu;

