import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState: any = {
    data: {},
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    try {
        const token = JSON.parse(localStorage.getItem("access_token"));
        if (token) {
            const response = await axios.post(`http://localhost:4000/api/v1/auth/user`, { token });
            if (response.status === 200) {
                return response.data;
            } else {
                console.error("Request was successful but received an unexpected response:", response);
                throw new Error("Unexpected response");
            }
        } else {
            console.warn("No access token found.");
            throw new Error("No access token");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
});

const userSlice = createSlice({
    initialState,
    name: 'user',
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error';
            });
    },
    reducers: {
        add(state) {

        }
    },
});

export default userSlice.reducer;
