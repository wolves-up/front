import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: (state) => {
      return null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        return {...state, ...action.payload};
      })
  }
}); 

export const updateUser = createAsyncThunk('user/updateUser', (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await setDoc(doc(db, 'users', data.id), { ...data }, { merge: true });
      resolve(data);
    } catch(err) {
      reject(err);
    }
  })
});

export const { signup, login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;