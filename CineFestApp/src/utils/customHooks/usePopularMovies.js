import { addPopularMovies } from "../Slices/moviesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../constant";

const usePopularMovies = () => {

const dispatch = useDispatch();
    const getPopularMovies = async () => {
        const popularMoviesDataStream = await fetch('https://api.themoviedb.org/3/movie/popular?page=2', TMDB_API_OPTIONS);
        const data = await popularMoviesDataStream.json();
        
        dispatch(addPopularMovies(data.results));
        
        // console.log(data.results);
    }

    useEffect(() => {
        getPopularMovies();
    },[]);


}
export default usePopularMovies;