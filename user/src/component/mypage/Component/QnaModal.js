import React from 'react'
import ReactModal from 'react-modal';


function QnaModal({isopen , setIsOpen , popup}) {
  return (
    <ReactModal isOpen={isopen} onRequestClose={()=>{setIsOpen(false)}}>
        <div>

        </div>
    </ReactModal>
  )
}

export default QnaModal
