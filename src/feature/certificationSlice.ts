import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState: any = {
    data: [{certification: "", institude: ""}],
    updateData: [],
    success: false,
    loading: false,
    error: null,
};

export const fetchCertificate = createAsyncThunk('certification/fetchCertificate', async (id) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/certification?user=${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
});

export const updateCertificate = createAsyncThunk('certification/updateCertificate', async (data) => {
    try {
        const response = await axios.put(`http://localhost:4000/api/v1/certification`, data);

        return response.data;

    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
});

const certificationSlice = createSlice({
    initialState,
    name: 'certification',
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchCertificate.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCertificate.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchCertificate.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload || 'Unknown error';
            })
            .addCase(updateCertificate.pending, (state) => {
                state.loading = true;
                state.success = false
            })
            .addCase(updateCertificate.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true
                state.updateData = action.payload;
                state.error = null;
            })
            .addCase(updateCertificate.rejected, (state, action) => {
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

export default certificationSlice.reducer;
