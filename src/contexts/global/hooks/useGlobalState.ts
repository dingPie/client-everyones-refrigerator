import { useReducer } from 'react';

import { createSlice } from '@/utils/react/create-slice';

export type GlobalStateType = {
  isLogin: boolean;
  id: number | null;
  accessToken: string | null;
  refrigeratorId: number | null;
};

const initialState: GlobalStateType = {
  isLogin: false,
  id: null,
  accessToken: null,
  refrigeratorId: null,
};

// 개발 시 count state & reducer 삭제
const { reducer } = createSlice({
  initialState,
  reducers: {
    RESET: () => initialState,
    LOGIN: (state, { _accessToken, _id }) => {
      state.isLogin = true;
      state.accessToken = _accessToken;
      state.id = _id;
      return state;
    },
    LOGOUT: (state) => {
      state.isLogin = false;
      state.accessToken = null;
      state.id = null;
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
