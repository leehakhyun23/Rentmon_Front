import React from 'react'

import ReservationManage from './space/ReservationManage'
import ReviewManage from './space/ReviewManage'
import Post_basicInfo from './space/Post_basicInfo'
import Post_cate from './space/Post_cate'
import Post_facility from './space/Post_facility'
import Post_payment from './space/Post_payment'
import Post_useInfo from './space/Post_useInfo'
import SpaceCorrection from './space/SpaceCorrection'
import SpaceManage from './space/SpaceManage'



function Main() {
  return (
    <div>
      <Post_basicInfo />
      ---------------------------------------------------------------------------------------------------------------------
      <Post_cate />
      ---------------------------------------------------------------------------------------------------------------------
      <Post_facility />
      ---------------------------------------------------------------------------------------------------------------------
      <Post_payment />
      ---------------------------------------------------------------------------------------------------------------------
      <Post_useInfo />
      ---------------------------------------------------------------------------------------------------------------------
      <ReservationManage />
      ---------------------------------------------------------------------------------------------------------------------
      <ReviewManage />
      ---------------------------------------------------------------------------------------------------------------------
      <SpaceCorrection />
      ---------------------------------------------------------------------------------------------------------------------
      <SpaceManage />
      ------------------------------------------------------------------------------------------------------------------------------------------------------------
      <ReviewManage />
    </div>
  )
}

export default Main
