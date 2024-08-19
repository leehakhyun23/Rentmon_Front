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
    imgsrc1:'',
    imgsrc2:'',
    imgsrc3:'',
    imgsrc4:'',
    imgsrc5:'',
    imgsrc6:'',
    imgsrc7:'',
    imgsrc8:'',
    imgsrc9:'',
    imgsrc10:'',
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
            state.maxpersonnal = action.payload.maxpersonnal;
            state.content = action.payload.content;
            state.caution = action.payload.caution;
            state.zipcode = action.payload.zipcode;
            state.province = action.payload.province;
            state.town = action.payload.town;
            state.village = action.payload.village;
            state.address_detail = action.payload.address_detail;
            state.imgsrc1 = action.payload.imgsrc1;
            state.imgsrc2 = action.payload.imgsrc2;
            state.imgsrc3 = action.payload.imgsrc3;
            state.imgsrc4 = action.payload.imgsrc4;
            state.imgsrc5 = action.payload.imgsrc5;
            state.imgsrc6 = action.payload.imgsrc6;
            state.imgsrc7 = action.payload.imgsrc7;
            state.imgsrc8 = action.payload.imgsrc8;
            state.imgsrc9 = action.payload.imgsrc9;
            state.imgsrc10 = action.payload.imgsrc10s
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

