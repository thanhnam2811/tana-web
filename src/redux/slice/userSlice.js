import { createSlice } from '@reduxjs/toolkit';
import callApi from '../../utils/callAPI';

const initialState = {
  data: undefined,
  isFetching: true,
};

export const userlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setIsFetching } = userlice.actions;

export const getUser = (token) => (dispatch) => {
  dispatch(setIsFetching(true));
  const fetchData = async () => {
    if (token) {
      const resp = await callApi(`users/${token}`);
      if (resp.success) dispatch(setUser(resp.data));
    }
    dispatch(setIsFetching(false));
  };
  fetchData();
};

export default userlice.reducer;
