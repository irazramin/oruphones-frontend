import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState: any = {
    data: [{name: ""}],
    updateData: [],
    success: false,
    loading: false,
    error: null,
};

export const fetchSkill = createAsyncThunk('skill/fetchSkill', async (id) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/skill?user=${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
});

export const updateSkill = createAsyncThunk('skill/updateSkill', async (data) => {
    try {
        const response = await axios.put(`http://localhost:4000/api/v1/skill`, data);

        return response.data;

    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
});

const skillSlice = createSlice({
    initialState,
    name: 'skill',
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchSkill.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSkill.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchSkill.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload || 'Unknown error';
            })
            .addCase(updateSkill.pending, (state) => {
                state.loading = true;
                state.success = false
            })
            .addCase(updateSkill.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true
                state.updateData = action.payload;
                console.log(action.payload)
                state.error = null;
            })
            .addCase(updateSkill.rejected, (state, action) => {
                state.loading = false;
                state.success = false

                state.error = action.payload || 'Unknown error';
            })

        ;
    },
    reducers: {
        add(state) {

        }
    },
});

export default skillSlice.reducer;
