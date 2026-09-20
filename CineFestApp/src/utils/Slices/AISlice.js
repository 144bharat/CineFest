import { createSlice } from "@reduxjs/toolkit";

const AISlice = createSlice({
    name:"ai",
    initialState: {
        isShowSearchPage: false,
        // aiResponseMovieNameList: null,
        // recommendedMovieList: null,

        recommendedMoviesListData: [
            {
                aiMovieTitle: null,
                tmdbProvidedMovieList:[]
            }
        ]
    },
    reducers: {
        toggleAISearchPage: (state, action) => {
            state.isShowSearchPage = !state.isShowSearchPage;
        },
        // addAIResponseMovieNameList: (state, action) => {
        //     state.aiResponseMovieNameList = action.payload;
        // },
        // addRecommendedMovieList: (state, action) => {
        //     state.recommendedMovieList = action.payload;
        // },
        addRecommendedMoviesListData: (state, action) => {
            state.recommendedMoviesListData.push(action.payload);
        },
        emptyRecommendedMoviesListData: (state, action) => {
            state.recommendedMoviesListData.length = 0;
        }
    }
});

export const { toggleAISearchPage, addAIResponseMovieNameList, addRecommendedMovieList, addRecommendedMoviesListData, emptyRecommendedMoviesListData } = AISlice.actions;
export default AISlice.reducer;