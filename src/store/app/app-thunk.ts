import { createAsyncThunk } from "@reduxjs/toolkit";
import { Request } from "../../core/request";
import { LoginDto } from "../../dtos/LoginDto";
import { toast } from "react-toastify";
import { RegistrationDto } from "../../dtos/RegistrationDto";

export const login = createAsyncThunk("/auth/login", async (loginDto: LoginDto, thunkAPI) => {
    try {
        const response = await Request.post("/auth/login", loginDto);
        return await response.data;
    } catch (error: any) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const registration = createAsyncThunk(
    "/auth/registration",
    async (registrationDto: RegistrationDto, thunkAPI) => {
        try {
            const response = await Request.post("/auth/registration", registrationDto);
            return await response.data;
        } catch (error: any) {
            toast.error(error.response.data.message);
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const loadUser = createAsyncThunk("/users/:id", async (userId: string, thunkAPI) => {
    try {
        const response = await Request.get(`/users/${userId}`);
        return await response.data;
    } catch (error: any) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});
