import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { useParams } from 'react-router';
import jaxios from '../../../util/jwtUtil';


function ReportModal({ reportopen, setReportopen }) {
    let user = useSelector(state => state.user);
    let {sseq}=useParams();
    let [space, setSpace] = useState({});
    let [issubmit, setisSubmit] = useState(false); 
    let [data , setData] = useState({});

    useEffect(
        () => {
          jaxios.get(`/api/space/getSpace/${sseq}`)
            .then((result) => {
              setSpace(result.data.space);
            })
            .catch((err) => { console.error(err) });

        }, []
      )



    useEffect(()=>{
        setData({
            space : space,
            title:"",
            content:"",
            user : user
        });
      },[reportopen]);

      useEffect(()=>{
        setisSubmit(false);
        if(data.title && data.content) setisSubmit(true);
      },[data])


    const onsubmit = async () => {
        let result = await jaxios.post("/api/declaration/insertDeclaration",data);
        try{}catch(err){console.log(err)}
        setReportopen(false);
    };

    return (
        <ReactModal
            isOpen={reportopen}
            onRequestClose={() => { setReportopen(false) }}>
            <div className='inquirypopup'>
                <h2>신고하기</h2>
                <div>
                    <div className='row writer'>
                        <span>작성자 : </span>
                        <p className='useridName'>{user.userid}</p>
                    </div>
                    <div className='row writer'>
                        <span>공간식별번호 : </span>
                        <p className='useridName'>{sseq}</p>
                    </div>
                    <div className='row'>
                        <span>신고제목 : </span>
                        <input type="text" name="title" value={data.title} onChange={(e) => {
                            setData(prev => { return { ...prev, title: e.target.value } });
                        }} />
                    </div>
                    <div className='row'>
                        <span>신고사유 : </span>
                        <textarea name="title" value={data.content} onChange={(e) => {
                            setData(prev => { return { ...prev, content: e.target.value } });
                        }} > </textarea>
                    </div>
                    <div className='row btnwrap'>
                        <button className={(issubmit) ? ("active") : ("")} onClick={() => { onsubmit() }}>전송</button>
                        <button onClick={() => { setReportopen(false) }}>취소</button>
                    </div>

                </div>
            </div>
        </ReactModal>
    );
}

export default ReportModal
