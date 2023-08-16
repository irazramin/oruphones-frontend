import userReducer from './userSlice';
import certificationReducer from './certificationSlice';
import experienceReducer from './experienceSlice';
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        user: userReducer,
        certification: certificationReducer,
        experience: experienceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;