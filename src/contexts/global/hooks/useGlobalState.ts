import { useReducer } from 'react';

import { createSlice } from '@/utils/react/create-slice';

export type GlobalStateType = {
  isLogin: null | boolean;
  count: number;
};

const initialState: GlobalStateType = {
  isLogin: null,
  count: 0,
};

// 개발 시 count state & reducer 삭제
const { reducer } = createSlice({
  initialState,
  reducers: {
    RESET: () => initialState,
    SET_IS_LOGIN: (state, isLogin: boolean) => {
      state.isLogin = isLogin;
    },
    INCREMENT: (state, count: number) => {
      state.count = count + 1;
    },
    DECREMENT: (state, count: number) => {
      state.count = count - 1;
    },
  },
});

export const useGlobalState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
