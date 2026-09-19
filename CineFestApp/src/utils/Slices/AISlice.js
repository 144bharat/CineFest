import { createSlice } from "@reduxjs/toolkit";

const AISlice = createSlice({
    name:"ai",
    initialState: {
        isShowSearchPage: false,
        recommendedMovieList: null
    },
    reducers: {
        toggleAISearchPage: (state, action) => {
            state.isShowSearchPage = !state.isShowSearchPage;
        },
        addRecommendedMovieList: (state, action) => {
            state.recommendedMovieList = action.payload;
        }
    }
});

export const { toggleAISearchPage, addRecommendedMovieList } = AISlice.actions;
export default AISlice.reducer;