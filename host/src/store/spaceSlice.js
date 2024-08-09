import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cnum: '', // 초기 상태에서 cnum만 설정
};

const spaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {
        setCnum: (state, action) => {
            state.cnum = action.payload; // cnum을 업데이트하는 리듀서
        },
        // 추가적인 액션 생성자는 나중에 필요할 경우 정의
    },
});


export const {logoutAction} = spaceSlice.actions;
export default spaceSlice;
