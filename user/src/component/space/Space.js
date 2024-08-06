import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Space(props) {
    //let loginUser = useSelector(state => state.user);
    const[spaceid, setSpaceid] = useState();
    const[imageList, setImageList] = useState([]);
    const[replyList, setReplyList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // useEffect(
    //     ()=>{
    //         axios.get(`/api/space/getImages/${props.space.id}`, 
    //             { headers: { "Authorization": `Bearer ${loginUser.accessToken}` } }
    //         )



    //     }, []
    // )

    return (
        <div>
            {/* SpaceList 조회 */}
            <div >
                {/* Space 하나의 정보 조회 */}

            </div>

            <div>
                {/* 해쉬태그 조회 */}
            </div>

            <div>
                {/* 해쉬태그 조회 */}
            </div>




        </div>
    )
}

export default Space
