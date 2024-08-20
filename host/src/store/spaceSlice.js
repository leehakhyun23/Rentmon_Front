import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cnum: '', // 초기 상태에서 cnum만 설정
    title: '',
    subtitle:'',
    price:'',
    maxpersonnal:'',
    content:'',
    caution:'',
    zipcode:'',
    province:'',
    town:'',
    village:'',
    address_detail:'',
    starttime:'',
    endtime:'',
    fnum:[],
    bank:'',
    accountnum:'',
    hostid:'',
    rList:[],
    oList:[],
};

const SpaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {
        setSpace: (state, action) => {
            state.cnum = action.payload.cnum; // cnum을 업데이트하는 리듀서
            state.title = action.payload.title;
            state.subtitle = action.payload.subtitle;
            state.price = action.payload.price;
            state.maxpersonnal = action.payload.maxpersonnal;
            state.content = action.payload.content;
            state.caution = action.payload.caution;
            state.zipcode = action.payload.zipcode;
            state.province = action.payload.province;
            state.town = action.payload.town;
            state.village = action.payload.village;
            state.address_detail = action.payload.address_detail;
            state.rList = action.payload.rList;
            state.oList = action.payload.oList;
            state.starttime = action.payload.starttime;
            state.endtime = action.payload.endtime;
            state.fnum = action.payload.fnum;
            state.bank = action.payload.bank;
            state.accountnum = action.payload.accountnum;
            state.hostid = action.payload.hostid;
        // 추가적인 액션 생성자는 나중에 필요할 경우 정의
        },
    },
});

export const {setSpace} = spaceSlice.actions;
export default spaceSlice;

