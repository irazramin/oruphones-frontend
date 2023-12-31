import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState: any = {
    data: [{college: "", degree: "", about: "", start: "", end: ""}],
    updateData: [],
    success: false,
    loading: false,
    error: null,
};

export const fetchEducation = createAsyncThunk('education/fetchEducation', async (id) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/education?user=${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
});

export const updateEducation = createAsyncThunk('education/updateEducation', async (data) => {
    try {
        const response = await axios.put(`http://localhost:4000/api/v1/education`, data);

        return response.data;

    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
});

const educationSlice = createSlice({
    initialState,
    name: 'education',
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchEducation.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEducation.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchEducation.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload || 'Unknown error';
            })
            .addCase(updateEducation.pending, (state) => {
                state.loading = true;
                state.success = false
            })
            .addCase(updateEducation.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true
                state.updateData = action.payload;
                console.log(state.updateData)
                state.error = null;
            })
            .addCase(updateEducation.rejected, (state, action) => {
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

export default educationSlice.reducer;
