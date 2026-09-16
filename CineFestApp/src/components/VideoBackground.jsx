import { useSelector } from "react-redux";
import useMovieTrailer from "../utils/customHooks/useMovieTrailer";

const VideoBackground = ({ videoId }) => {

  useMovieTrailer(videoId);

  const trailer = useSelector(appStore => appStore.movies?.movieTrailer);
  
  return (
    <div className="z-5 bg-linear-to-r from-black via-gray-800 to-gray-300 overflow-x-hidden">
       <iframe
            className="aspect-video opacity-80 z-0"
            src={"https://www.youtube.com/embed/" + trailer?.key + "?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&loop=1&playlist=" + trailer?.key}
            title="YouTube video player"
        ></iframe>

    </div>
  )
}

export default VideoBackground;