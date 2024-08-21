import { List, ListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HostPage = () => {
    const [hostList, setHostList] = useState([]);
    const [paging, setPaging] = useState({});

    useEffect(() => {
        axios.get("/api/admin/host")
        .then((res) => {
            if (res.status === 200) {
                setHostList(res.data.content);
                setPaging(res.data.page)
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }, [])

    return (
        <div>
            호스트
            <List>
                <ListItem></ListItem>
                {hostList.map((host, idx) => (
                    <ListItem key={idx}>
                        {host.hostid} {} {} {} {} {}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default HostPage;