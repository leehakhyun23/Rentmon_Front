import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cnum: '', // 초기 상태에서 cnum만 설정
    title: '',
    subtitle:'',
    price:'',
    personnal:'',
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
    startDate:'',
    endDate:'',
    monthholi:[],
    weekholi:[],
    dayholi:[],
    fnum:[],
    bank:'',
    accountnum:'',
    hostid:'',
};

const spaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {
        setSpace: (state, action) => {
            state.cnum = action.payload.cnum; // cnum을 업데이트하는 리듀서
            state.title = action.payload.title;
            state.subtitle = action.payload.subtitle;
            state.price = action.payload.price;
            state.personnal = action.payload.personnal;
            state.maxpersonnal = action.payload.maxpersonnal;
            state.content = action.payload.content;
            state.caution = action.payload.caution;
            state.zipcode = action.payload.zipcode;
            state.province = action.payload.province;
            state.town = action.payload.town;
            state.village = action.payload.village;
            state.address_detail = action.payload.address_detail;
            state.imgSrc = action.payload.imgSrc;
            state.starttime = action.payload.starttime;
            state.endtime = action.payload.endtime;
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
            state.monthholi = action.payload.monthholi;
            state.weekholi = action.payload.weekholi;
            state.dayholi = action.payload.dayholi;
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

