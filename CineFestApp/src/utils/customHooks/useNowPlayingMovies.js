//This hook is created to handle now playing movies fetch directly from TMDB api and add them into redux store.

import { TMDB_API_OPTIONS } from "../constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../Slices/moviesSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
        const nowPlayingDataStream = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=4', TMDB_API_OPTIONS);
        const data = await nowPlayingDataStream.json();

        dispatch(addNowPlayingMovies(data.results));
    }

    useEffect(() => {
        getNowPlayingMovies();
    },[]);


}

export default useNowPlayingMovies;