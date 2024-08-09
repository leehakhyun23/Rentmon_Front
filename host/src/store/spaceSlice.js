import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    price:'',
    title:'',
    subtitle:'',
    content:'',
    starttime:'',
    endtime:'',
    caution:'',
    zipcode:'',
    province:'',
    town:'',
    vilage:'',
    addressdetail:'',
    fnum:'',
    hostid:'',
    cnum:'',
    mintime:'',
    accessToken:'',
    refreshToken:'',
}

const spaceSlice = createSlice({
    name:"space",
    initialState,
    reducers: {
        logoutAction:(state)=>{
            state.price = '';
            state.title = '';
            state.subtitle = '';
            state.content = '';
            state.starttime = '';
            state.endtime = '';
            state.caution = '';
            state.zipcode = '';
            state.province='';
            state.town='';
            state.vilage = '';
            state.addressdetail='';
            state.fnum='';
            state.hostid = '';
            state.cnum='';
            state.mintime='';
            state.vilage = '';
            state.accessToken='';
            state.refreshToken='';
        },
        
    }
});

export const {logoutAction} = spaceSlice.actions;
export default spaceSlice;