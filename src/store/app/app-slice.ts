import { createSlice } from "@reduxjs/toolkit";
import { Roles } from "../../types/Roles";
import { loadUser, login, registration } from "./app-thunk";
import { User } from "../../types/User";

interface IAppSlice {
    isAuthenticated: boolean;
    isLoginLoading: boolean;
    isLoginModalOpen: boolean;
    isUserLoading: boolean;
    role: number;
    user: User | undefined;
}

const initialState: IAppSlice = {
    isAuthenticated: false,
    isLoginLoading: false,
    isLoginModalOpen: false,
    isUserLoading: false,
    role: Roles.GUEST,
    user: undefined,
};

const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleAuthenticate: (state) => {
            state.isAuthenticated = !state.isAuthenticated;
        },
        logOut: (state) => {
            localStorage.removeItem("token");
            state.role = Roles.GUEST;
            state.isAuthenticated = false;
            state.user = undefined;
        },
        toggleLoginModal: (state, action) => {
            state.isLoginModalOpen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoginLoading = true;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            localStorage.setItem("token", payload.token);
            state.isLoginLoading = false;
            state.isLoginModalOpen = false;
            state.isAuthenticated = true;
        });
        builder.addCase(login.rejected, (state, action: any) => {
            state.isLoginLoading = false;
        });

        builder.addCase(registration.pending, (state) => {
            state.isLoginLoading = true;
        });
        builder.addCase(registration.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.token);
            state.isLoginLoading = false;
            state.isLoginModalOpen = false;
            state.isAuthenticated = true;
        });
        builder.addCase(registration.rejected, (state, action: any) => {
            state.isLoginLoading = false;
        });

        builder.addCase(loadUser.pending, (state) => {
            state.isUserLoading = true;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            let user = <User>action.payload;
            state.user = user;
            state.role = Roles[user.role.value];
            state.isUserLoading = false;
            state.isAuthenticated = true;
        });
        builder.addCase(loadUser.rejected, (state, action: any) => {
            state.isUserLoading = false;
        });
    },
});

export const { toggleAuthenticate, logOut, toggleLoginModal } = AppSlice.actions;

export default AppSlice.reducer;
