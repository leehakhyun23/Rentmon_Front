import { createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "../util/cookieUtil";


const initialState = {
    mseq:"",
    userid:"",
    nickname:"",
    email:"",
    phone:"",
    profileimg:"",
    provider:"",
    snsid:"",
    cseq:"",
    gnum:"",
    name:"",
    category1 :"",
    category2 : "",
    category3 : "",
    station:"",
    snsid:"",
    create_at:""
    
}

const userSlice = createSlice({
        name:"user",
        initialState,
        reducers:{
            loginAction:(state, action)=>{
                state.mseq=action.payload.mseq;
                state.userid=action.payload.userid;
                state.nickname=action.payload.nickname;
                state.email=action.payload.email;
                state.phone=action.payload.phone;
                state.profileimg=action.payload.profileimg;
                state.provider=action.payload.Provider;
                state.snsid=action.payload.snsid;
                state.cseq=action.payload.cseq;
                state.gnum=action.payload.gnum;
                state.name=action.payload.name;
                state.category1=action.payload.category1;
                state.category2=action.payload.category2;
                state.category3=action.payload.category3;
                state.station=action.payload.station;
                state.snsid=action.payload.snsid;
                state.create_at=action.payload.create_at;
            },
            logoutAction:(state)=>{
                state.mseq="";
                state.userid="";
                state.nickname="";
                state.email="";
                state.phone="";
                state.profileimg="";
                state.provider="";
                state.snsid="";
                state.cseq="";
                state.gnum="";
                state.name="";
                state.category1="";
                state.category2="";
                state.category3="";
                state.station="";
                state.snsid="";
                state.create_at="";
                removeCookie("token","/");
            }
        }
});

export const {loginAction, logoutAction} = userSlice.actions;
export default userSlice;