import { useEffect } from 'react';
import { options } from "../constant";
import { addMovieTrailer } from "../Slices/moviesSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer = (videoId) => {
    
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
      const dataStream = await fetch(`https://api.themoviedb.org/3/movie/${videoId}/videos`, options)
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