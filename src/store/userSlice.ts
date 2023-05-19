import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  id: string;
  username: string;
  email: string;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  followersNumber: string;
  followingNumber: string;
}

const initialState: initialStateType = {
  id: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  profilePhoto: "",
  followersNumber: "",
  followingNumber: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state.id = action.payload.id),
        (state.username = action.payload.username),
        (state.email = action.payload.email),
        (state.firstName = action.payload.firstName),
        (state.lastName = action.payload.lastName),
        (state.profilePhoto = action.payload.profilePhotoRef),
        (state.followersNumber = action.payload.followersNumber),
        (state.followingNumber = action.payload.followingNumber);
    },
    resetUser: (state) => {
      (state.id = ""),
        (state.username = ""),
        (state.email = ""),
        (state.firstName = ""),
        (state.lastName = ""),
        (state.profilePhoto = ""),
        (state.followersNumber = ""),
        (state.followingNumber = "");
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
