import { useEffect } from 'react';
import { TMDB_API_OPTIONS } from "../constant";
import { addMovieTrailer } from "../Slices/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useMovieTrailer = (videoId) => {
    
  const dispatch = useDispatch();
  const getMovieTrailer = useSelector(state => state.movies.movieTrailer);

  const getMovieVideos = async () => {
      const dataStream = await fetch(`https://api.themoviedb.org/3/movie/${videoId}/videos`, TMDB_API_OPTIONS)
      const data = await dataStream.json();
      const filteredTrailerData = data.results.filter(video => video.type === "Trailer");
      const trailer = filteredTrailerData.length? filteredTrailerData[0]: data.results[0];
      dispatch(addMovieTrailer(trailer));
  }

  useEffect(() => {
    //Only if the movie trailer is not already in the state, fetch it from the API
    if(!getMovieTrailer) {
      getMovieVideos();
    }

  },[]);

}

export default useMovieTrailer;