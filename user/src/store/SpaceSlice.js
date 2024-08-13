import { createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "../util/cookieUtil";


const initialState = {

    // space 정보
    sseq : "",
    price : "",
    title : "",
    subtitle : "",
    content : "",
    satrttime : "",
    endtime : "",
    caution : "",
    zipcode : "",
    province : "",
    village : "",
    addressdetail : "",
    fnum : "",
    created_at : "",
    hostid : "",
    cnum : "",
    mintime : "",
    personnal : "",
    maxpersonnal : "",

    // 관계 정보
    zzimcount : "",
    reviews : [],
    images : [],
    hashtags : [],
    chatrooms : [],
    facilities : []


}

const spaceSlice = createSlice({
        name:"space",
        initialState,
        reducers:{
            SpaceInAction:(state, action)=>{
                state.sseq = action.payload.sseq;
                state.price = action.payload.price;
                state.title = action.payload.title;
                state.subtitle = action.payload.subtitle;
                state.content = action.payload.content;
                state.satrttime = action.payload.satrttime;
                state.endtime = action.payload.endtime;
                state.caution = action.payload.caution;
                state.zipcode = action.payload.zipcode;
                state.province = action.payload.province;
                state.village = action.payload.village;
                state.addressdetail = action.payload.addressdetail;
                state.fnum = action.payload.fnum;
                state.created_at = action.payload.created_at;
                state.hostid = action.payload.hostid;
                state.cnum = action.payload.cnum;
                state.mintime = action.payload.mintime;
                state.personnal = action.payload.personnal;
                state.maxpersonnal = action.payload.maxpersonnal;
            
                // 관계 정보

                // zzimcount = action.payload.zzimcount;
                // reviews = action.payload.reviews;
                // images = action.payload.images;
                // hashtags = action.payload.hashtags;
                // chatrooms = action.payload.chatrooms;
                // facilities = action.payload.facilities;


            },
            SpaceOutAction:(state)=>{
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
                state.categroy2="";
                state.station="";
                state.snsid="";
                state.create_at="";
                removeCookie("token","/");
            }
        }
});

export const {SpaceInAction, SpaceOutAction} = spaceSlice.actions;
export default spaceSlice;