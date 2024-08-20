import axios from 'axios';
import React, { useEffect } from 'react';

const HostPage = () => {
    useEffect(() => {
        axios.get("")
        .then((res) => {
            if (res.status === 200) {

            }
        })
        .catch((err) => {
            console.error(err);
        })
    }, [])

    return (
        <div>
            호스트
        </div>
    );
};

export default HostPage;