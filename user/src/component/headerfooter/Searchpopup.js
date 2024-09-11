import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import RecommandTag from './component/RecommandTag';
import RectnRecord from './component/RectnRecord'
import { SearchOnAction, SearchOutAction} from '../../store/SearchSlice';
import { getCookie, removeCookie, setAuthoCookie } from '../../util/cookieUtil';


function Searchpopup({searchshow, setSearchPopup ,searchWord ,setSearchWord}) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [ recentSearchList, setRecentSearchList ]=useState([]);
    let search = useSelector(state=>state.search);
    

    let deleterecord = (n)=>{
       let filetr = recentSearchList.filter((elem)=>elem !== n);
       setRecentSearchList(filetr);
       setAuthoCookie("recentSearch",filetr,60);
    }

    useEffect(()=>{
        getContent();
    }, [search]);


    let getContent = ()=>{
        let recentSearch = getCookie("recentSearch");
        if(recentSearch) setRecentSearchList(recentSearch);
        if( searchWord == ''){
            dispatch(SearchOutAction());
        }
    }

    let enterSpaceList = (e)=>{
        if(e.key === 'Enter'){
            if (searchWord.trim()){
                let arr = getCookie("recentSearch") ?  getCookie("recentSearch")  : recentSearchList;
                if (!arr.includes(searchWord)) {
                    if (searchWord !== undefined) arr.unshift(searchWord);
                    if (arr.length >= 6) arr.pop();
                }
                setAuthoCookie("recentSearch",arr,60);
                setSearchPopup(false);
                dispatch(SearchOnAction({searchWord}));
                navigate(`/spaceList`);
            } else{
                dispatch(SearchOutAction());
            }
        }
    }

    let recentseqrchClick=(word)=>{
        dispatch(SearchOnAction({searchWord : word}));
        setSearchWord(word);
        navigate(`/spaceList`);
        setSearchPopup(false);
    }
  return (
    <>
    <div className='searchPopup-container' style={searchshow}>
        <div className='innerContainer'>
            <div className='input-conatiner'>
                <input type="text" value={searchWord} onKeyDown={enterSpaceList} onChange={(e)=>{setSearchWord(e.currentTarget.value)}} placeholder='어떤 공간을 찾으세요?'/>
                <img src='/img/searchIcon.svg' alt='searchIcon.svg' />
            </div>
            <div className='bottom'>
                <div className='left recent-search'>
                    <div className='title'>
                        <h2>최근 검색어</h2>
                        <button onClick={()=>{
                            removeCookie("recentSearch");
                            setRecentSearchList([]);
                        }}>전체 삭제</button>
                    </div>
                    <div className='list'>
                        {/* 포문으로 돌리는 곳 */}
                      {(recentSearchList)&&(recentSearchList.map((elem , idx)=>(
                         <RectnRecord key={idx} text={elem} recentseqrchClick ={recentseqrchClick} deleterecord={()=>{deleterecord(elem)}}/>
                      )))} 
                    </div>
                </div>
                <div className='right recommand-keyword'>
                    <div className='title'>
                        <h2>추천 키워드</h2>
                    </div>
                    <div className='taglist'>
                        {/* 포문 */}
                        <RecommandTag text={"스터디룸"} recentseqrchClick={recentseqrchClick}/>
                        <RecommandTag text={"브라이덜샤워"} recentseqrchClick={recentseqrchClick}/>
                        <RecommandTag text={"영화"} recentseqrchClick={recentseqrchClick}/>
                    </div>
                </div>
            </div>
        </div>
        <div className='searchPopup-close' onClick={()=>{setSearchPopup(false)}}><span></span></div>
    </div>
    <div className='searchpopupblack' style={searchshow} onClick={()=>{setSearchPopup(false)}}></div>
    </>
  )
}

export default Searchpopup
