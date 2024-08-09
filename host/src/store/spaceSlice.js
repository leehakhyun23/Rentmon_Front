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
}

const spaceSlice = createSlice({
    name:"space",
    initialState,
    reducers: {

    }
})