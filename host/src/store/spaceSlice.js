import { createSlice } from '@reduxjs/toolkit';

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


const SpaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {

        setCnum: (state, action) => {
            state.cnum = action.payload; // cnum을 업데이트하는 리듀서
        },
        // 추가적인 액션 생성자는 나중에 필요할 경우 정의
    },
});

export const { setCnum } = SpaceSlice.actions;
export default SpaceSlice.reducer; // default로 내보내기

