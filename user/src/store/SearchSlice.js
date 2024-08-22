import { createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "../util/cookieUtil";


const initialState = {
    searchWord:""
}

const searchSlice = createSlice({
        name:"search",
        initialState,
        reducers:{
            SearchOnAction:(state, action)=>{
                state.searchWord=action.payload.searchWord;
            },
            SearchOutAction:(state)=>{
                state.searchWord=""
            }
        }
});

export const {SearchOnAction, SearchOutAction} = searchSlice.actions;
export default searchSlice;