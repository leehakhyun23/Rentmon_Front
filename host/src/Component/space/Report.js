import React, { useState, useEffect } from 'react';
import Submenu from '../member/Submenu';
import '../css/reviewManage.css';
import '../css/header.css';
import jaxios from './../../util/jwtUtil';
import { useSelector } from 'react-redux';
import SalesChart from '../chart/SalesChart';
import ReservationsChart from '../chart/ReservationsChart';
import style from './../../../node_modules/dom-helpers/esm/css';

function Report() {
    const host = useSelector(state => state.host);
    const [spaces, setSpaces] = useState([]);
    const [totalSales, setTotalSales] = useState({});
    const [reservations, setReservations] = useState({});

    useEffect(() => {
        jaxios.get("/api/host/getspaces", { params: { hostid: host.hostid } })
        .then((res) => {
            if (res.status === 200) {
                setSpaces(res.data);
            }
        })
        .catch((err) => console.error(err));

        jaxios.get("/api/host/totalsales", { params: { hostid: host.hostid } })
        .then((res) => {
            if (res.status === 200) {
                setTotalSales(res.data);
                console.log(res.data);
            }
        })
        .catch((err) => console.error(err));

        jaxios.get("/api/host/reservations", { params: { hostid: host.hostid } })
        .then((res) => {
            if (res.status === 200) {
                setReservations(res.data);
                console.log(res.data);
            }
        })
        .catch((err) => console.error(err));
    }, [host.hostid]);

    return (
        <article>
            <div className='rheader'>
                <div className='logo3'>운영지표</div>
                <div className='left'><Submenu /></div>
            </div>
            <div>
                {spaces.length > 0 ? (
                    <select className='sel'>
                        <option value="">공간 선택하기</option>
                        {spaces.map(space => (
                            <option key={space.sseq} value={space.sseq}>
                                {space.title}
                            </option>
                        ))}
                    </select>
                ) : (
                    <div>등록한 공간이 없습니다.</div>
                )}
            </div>
            <div className='charts' style={{ width: '100%' }}>
                <h2>매출 지표</h2>
                <SalesChart data={totalSales} />
                <h2>예약 현황</h2>
                <ReservationsChart data={reservations} />
            </div>
        </article>
    )
}

export default Report;
