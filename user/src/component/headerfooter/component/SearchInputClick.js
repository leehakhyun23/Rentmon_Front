import React from 'react'

function SearchInputClick({setSearchPopup , searchWord}) {
  return (
    <div className='fakeInputButton' onClick={()=>{setSearchPopup(true)}}>
      <p>{(searchWord==="")?("어떤 공간을 찾으세요?"):(searchWord)}</p>
      <img src='/img/searchIcon.svg' alt='searchIcon'/>
    </div>
  )
}

export default SearchInputClick
