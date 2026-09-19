import { addUpcomingMovies } from "../Slices/moviesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../constant";

const useUpcomingMovies = () => {

const dispatch = useDispatch();
    const getUpcomingMovies = async () => {
        const upcomingMoviesDataStream = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', TMDB_API_OPTIONS);
        const data = await upcomingMoviesDataStream.json();
        
        dispatch(addUpcomingMovies(data.results));
    }

    useEffect(() => {
        getUpcomingMovies();
    },[]);


}
export default useUpcomingMovies;