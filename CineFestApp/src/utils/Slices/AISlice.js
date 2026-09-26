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
        ],
        language: "en",
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
        },
        updateLanguage: (state, action) => {
            state.language = action.payload; // IN CASE OF LANGUAGE CHANGE
        }
    }
});

export const { toggleAISearchPage, addAIResponseMovieNameList, addRecommendedMovieList, addRecommendedMoviesListData, emptyRecommendedMoviesListData, updateLanguage } = AISlice.actions;
export default AISlice.reducer;