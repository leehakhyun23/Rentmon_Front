import { createSlice } from "@reduxjs/toolkit";

const initialState={
    recentReserve:null,
    recentveiwStore:{},
    menucount : []
}

const recentSlice = createSlice({
    name:"recent",
    initialState,
    reducers:{
        recentReserveAction:(state,action)=>{
            state.recentReserve= action.payload.recentReserve;
        },
        logoutRecentRerveAction:(state)=>{
            state.recentReserve=null;
        }
        
    }
});


export const {recentReserveAction, logoutRecentRerveAction} = recentSlice.actions;
export default recentSlice;

