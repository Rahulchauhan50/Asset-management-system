import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  UserDetails: {},
};

const UserSlice = createSlice({
  name: 'UserAuth',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
        state.UserDetails = action.payload?.user
    }
}});

export const { setUserDetails } = UserSlice.actions;

export default UserSlice.reducer;