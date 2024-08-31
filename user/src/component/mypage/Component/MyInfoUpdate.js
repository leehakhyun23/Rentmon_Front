import React from 'react'
import jaxios from '../../../util/jwtUtil'
import MyCardCommonent from './MyCardCommonent'
import MyInfoCommonent from './MyInfoCommonent'
function MyInfoUpdate({user ,updateUser}) {

  let setFunction = async(url ,dname, data)=>{
    let datapost ={userid : user.userid }
    datapost[dname] = data;
    let result = await jaxios.post(url,null,{params:datapost});
    updateUser();
  }
  return (
    <div className='myinfo'>
        <div>
            <div className='userinfo'>
              <MyInfoCommonent name={"이름"} content={user.name} setFunction={setFunction} userdata={{url:"/api/user/updatename", dname:"name"}}/>
              <MyInfoCommonent name={"전화번호"} content={user.phone} setFunction={setFunction} userdata={{url:"/api/user/updatephone", dname:"phone"}}/>
              {(!user.snsid)&&( <MyInfoCommonent name={"비밀번호"} content={"*******"} setFunction={setFunction}  userdata={{url:"/api/user/updatepwd", dname:"password"}}/>)}
             
            </div>
            <MyCardCommonent card={user.cseq} updateUser={updateUser} />
        </div>
    </div>
  )
}

export default MyInfoUpdate
