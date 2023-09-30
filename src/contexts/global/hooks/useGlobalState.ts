import { useReducer } from 'react';

import { createSlice } from '@/utils/react/create-slice';

export type GlobalStateType = {
  isLogin: null | boolean;
  accessToken?: string;
  refrigeratorId: null | number;
};

const initialState: GlobalStateType = {
  isLogin: null,
  accessToken: undefined,
  refrigeratorId: null,
};

// 개발 시 count state & reducer 삭제
const { reducer } = createSlice({
  initialState,
  reducers: {
    RESET: () => initialState,
    LOGIN: (state, _accessToken: string) => {
      state.isLogin = true;
      state.accessToken = _accessToken;
      return state;
    },
    LOGOUT: (state) => {
      state.isLogin = false;
      state.accessToken = undefined;
      return state;
    },
    SET_REFRIGERATOR_ID: (state, _refrigeratorId) => {
      state.refrigeratorId = _refrigeratorId;
      return state;
    },
  },
});

export const useGlobalState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
