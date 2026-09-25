import { addTopRatedMovies } from "../Slices/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../constant";

const useTopRatedMovies = () => {

const dispatch = useDispatch();
const getTopRatedMoviesList = useSelector((state) => state.movies.topRatedMovies);

    const getTopRatedMovies = async () => {
        const topRatedMoviesDataStream = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', TMDB_API_OPTIONS);
        const data = await topRatedMoviesDataStream.json();
        
        dispatch(addTopRatedMovies(data.results));
    }

    useEffect(() => {
        //Only if the top rated movies are not already in the state, fetch it from the API
        if(!getTopRatedMoviesList) {
            getTopRatedMovies();
        }

    },[]);


}
export default useTopRatedMovies;