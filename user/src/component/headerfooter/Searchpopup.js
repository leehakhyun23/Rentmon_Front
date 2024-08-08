import React from 'react'
import RecommandTag from './component/RecommandTag';
import RectnRecord from './component/RectnRecord'

function Searchpopup({searchshow, setSearchPopup ,searchWord ,setSearchWord}) {

    let deleterecord = (n)=>{
        console.log(n);
    }
  return (
    <>
    <div className='searchPopup-container' style={searchshow}>
        <div className='innerContainer'>
            <div className='input-conatiner'>
                <input type="text" value={searchWord} onChange={(e)=>{setSearchWord(e.currentTarget.value)}} placeholder='어떤 공간을 찾으세요?'/>
                <img src='/img/searchIcon.svg' alt='searchIcon.svg' />
            </div>
            <div className='bottom'>
                <div className='left recent-search'>
                    <div className='title'>
                        <h2>최근 검색어</h2>
                        <button>전체 삭제</button>
                    </div>
                    <div className='list'>
                        {/* 포문으로 돌리는 곳 */}
                        <RectnRecord text={"스터디룸"} url ={"/"} deleterecord={()=>{deleterecord(1)}}/>
                        <RectnRecord text={"스터디룸"} url ={"/"} deleterecord={()=>{deleterecord(2)}} />
                    </div>
                </div>
                <div className='right recommand-keyword'>
                    <div className='title'>
                        <h2>추천 키워드</h2>
                    </div>
                    <div className='taglist'>
                        {/* 포문 */}
                        <RecommandTag text={"스터디룸"} ulr={"/"}/>
                        <RecommandTag text={"브라이덜샤워"} ulr={"/"}/>
                        <RecommandTag text={"영화"} ulr={"/"}/>
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