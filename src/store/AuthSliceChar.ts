// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserState {
//     status: boolean;
//     userData: null | string;
// };

// const initialState: UserState = {
//     status: false,
//     userData: null
// };

// export const authSlice = createSlice({
//     name: "authSlice",
//     initialState,
//     reducers: {
//         login: (state, action: PayloadAction<{ userData: string }>) => {
//             state.status = true;
//             state.userData = action.payload.userData;
//         },

//         logout: (state) => {
//             state.status = false;
//             state.userData = null;
//         }
//     }
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer; 
// // <-- Specify authSlice.reducer here
