import { useEffect } from 'react';
import { TMDB_API_OPTIONS } from "../constant";
import { addMovieTrailer } from "../Slices/moviesSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer = (videoId) => {
    
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
      const dataStream = await fetch(`https://api.themoviedb.org/3/movie/${videoId}/videos`, TMDB_API_OPTIONS)
      const data = await dataStream.json();
      const filteredTrailerData = data.results.filter(video => video.type === "Trailer");
      const trailer = filteredTrailerData.length? filteredTrailerData[0]: data.results[0];
      dispatch(addMovieTrailer(trailer));
  }

  useEffect(() => {
    getMovieVideos();
  },[]);

}

export default useMovieTrailer;