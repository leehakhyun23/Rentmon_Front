import { createSlice } from "@reduxjs/toolkit";

const initialState={
    recentReserve:null,
    recentveiwStore:{},
    menucount : {},
    weather:null
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
        },
        weatherSetAction:(state,action)=>{
            state.weather = action.payload.weather;
        },
        menucountAction:(state,action)=>{
            state.menucount = action.payload.menucount;
        }
        
    }
});


export const {recentReserveAction, logoutRecentRerveAction , weatherSetAction , menucountAction} = recentSlice.actions;
export default recentSlice;

