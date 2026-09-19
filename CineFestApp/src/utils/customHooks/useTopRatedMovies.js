import { addTopRatedMovies } from "../Slices/moviesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../constant";

const useTopRatedMovies = () => {

const dispatch = useDispatch();
    const getTopRatedMovies = async () => {
        const topRatedMoviesDataStream = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', TMDB_API_OPTIONS);
        const data = await topRatedMoviesDataStream.json();
        
        dispatch(addTopRatedMovies(data.results));
    }

    useEffect(() => {
        getTopRatedMovies();
    },[]);


}
export default useTopRatedMovies;