import { addPopularMovies } from "../Slices/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../constant";

const usePopularMovies = () => {

const dispatch = useDispatch();
const getPopularMoviesList = useSelector((state) => state.movies.popularMovies);

    const getPopularMovies = async () => {
        const popularMoviesDataStream = await fetch('https://api.themoviedb.org/3/movie/popular?page=2', TMDB_API_OPTIONS);
        const data = await popularMoviesDataStream.json();
        
        dispatch(addPopularMovies(data.results));
    }

    useEffect(() => {
        //Only if the popular movies are not already in the state, fetch it from the API
        if(!getPopularMoviesList) {
            getPopularMovies();
        }

    },[]);


}
export default usePopularMovies;