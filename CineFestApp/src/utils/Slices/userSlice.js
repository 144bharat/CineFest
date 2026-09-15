import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name: "user",
        initialState: null,
        reducers: {
            addUser: (state, action) => {
                return action.payload;  // IN CASE OF SIGN IN
            },
            removeUser: (state, action) => {
                return null; // IN CASE OF SIGN OUT
            }
        }
    }
)

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;