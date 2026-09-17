import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";
import usePopularMovies from "../utils/customHooks/usePopularMovies";
import useTopRatedMovies from "../utils/customHooks/useTopRatedMovies";
import useUpcomingMovies from "../utils/customHooks/useUpcomingMovies";

const SecondaryContainer = () => {
  
//This hook is created to handle now playing movies fetch directly from TMDB api and add them into redux store.
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

  const nowPlayingMovies = useSelector(appStore => appStore.movies.nowPlayingMovies);
  const popularMovies = useSelector(appStore => appStore.movies.popularMovies);
  const topRatedMovies = useSelector(appStore => appStore.movies.topRatedMovies);
  const upcomingMovies = useSelector(appStore => appStore.movies.upcomingMovies);

  if(nowPlayingMovies === null){
    return;
  }
  
  console.log(nowPlayingMovies);
  return (
    <div className="bg-black/90">
      <div className="-mt-64 relative z-5">
        <MoviesList title="Now Playing Movies" movies={nowPlayingMovies} />
        <MoviesList title="Upcoming Movies" movies={upcomingMovies} />
        <MoviesList title="Top Rated Movies" movies={topRatedMovies} />
        <MoviesList title="Popular Movies" movies={popularMovies} />
      </div>
    </div>

  )
}

export default SecondaryContainer