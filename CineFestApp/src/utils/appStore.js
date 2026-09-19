import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import moviesReducer from "./Slices/moviesSlice";
import AIReducer from "./Slices/AISlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        ai: AIReducer
    }
});

export default appStore;