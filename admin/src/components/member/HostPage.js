import { Box, List, ListItem, Pagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HostPage = () => {
    const [hostList, setHostList] = useState([]);
    const [paging, setPaging] = useState({ page: 0, size: 10, totalPages: 1 });

    const fetchHostList = (page = 0, size = 10) => {
        axios.get(`/api/admin/host?page=${page}&size=${size}`)
        .then((res) => {
            if (res.status === 200) {
                setHostList(res.data.content);
                setPaging({ 
                    page: res.data.page.number, 
                    size: res.data.page.size, 
                    totalPages: res.data.page.totalPages 
                })

                console.log(res.data);
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }


    useEffect(() => {
        fetchHostList(paging.page, paging.size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Pagination count={paging.totalPages} page={paging.page + 1} /*onChange={handlePageChange}*/ color="primary"/>
            </Box>
        </div>
    );
};

export default HostPage;