//This hook is created to handle now playing movies fetch directly from TMDB api and add them into redux store.

import { TMDB_API_OPTIONS } from "../constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../Slices/moviesSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
  const getNowPlayingMoviesData = useSelector(state => state.movies.nowPlayingMovies);

    const getNowPlayingMovies = async () => {
        const nowPlayingDataStream = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=4', TMDB_API_OPTIONS);
        const data = await nowPlayingDataStream.json();

        dispatch(addNowPlayingMovies(data.results));
    }

    useEffect(() => {
        //Only if the now playing movies are not already in the state, fetch it from the API
        if(!getNowPlayingMoviesData) {
            getNowPlayingMovies();
        }
        
    },[]);


}

export default useNowPlayingMovies;