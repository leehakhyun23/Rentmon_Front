import { createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "../util/cookieUtil";


const initialState = {
    mseq:"",
    userid:"",
    pwd:"",
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
    categroy2 : "",
    station:"",
    snsid:"",
    create_at:""
}

const hostSlice = createSlice({
        name:"host",
        initialState,
        reducers:{
            loginAction:(state, action)=>{
                state.mseq=action.payload.mseq;
                state.hostid=action.payload.hostid;
                state.pwd=action.payload.pwd;
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
                state.categroy2=action.payload.categroy2;
                state.station=action.payload.station;
                state.snsid=action.payload.snsid;
                state.create_at=action.payload.create_at;
            },
            logoutAction:(state)=>{
                state.mseq="";
                state.userid="";
                state.pwd="";
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
                state.categroy2="";
                state.station="";
                state.snsid="";
                state.create_at="";
                removeCookie("token","/");
            }
        }
});

export const {loginAction, logoutAction} = hostSlice.actions;
export default hostSlice;