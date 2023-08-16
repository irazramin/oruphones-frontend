import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState: any = {
    data: [{company: "", position: "", jobType: "", start: "", end: ""}],
    updateData: [],
    success: false,
    loading: false,
    error: null,
};

export const fetchExperience = createAsyncThunk('experience/fetchExperience', async (id) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/experience?user=${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
});

export const updateExperience = createAsyncThunk('experience/updateExperience', async (data) => {
    try {
        const response = await axios.put(`http://localhost:4000/api/v1/experience`, data);

        return response.data;

    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
});

const experienceSlice = createSlice({
    initialState,
    name: 'experience',
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchExperience.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchExperience.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload || 'Unknown error';
            })
            .addCase(updateExperience.pending, (state) => {
                state.loading = true;
                state.success = false
            })
            .addCase(updateExperience.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true
                state.updateData = action.payload;
                console.log(action.payload)
                state.error = null;
            })
            .addCase(updateExperience.rejected, (state, action) => {
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

export default experienceSlice.reducer;
