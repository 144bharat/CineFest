import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';
import { useSelector } from 'react-redux';

const MainContainer = () => {

  const nowPlayingMovies = useSelector(appStore => appStore.movies?.nowPlayingMovies);
  if(nowPlayingMovies === null) return;
  
  const mainMovie = nowPlayingMovies[0];
  const {original_title, overview, vote_average, id } = mainMovie;

  return (
    <div className=''>
        <VideoTitle title={original_title} overview={overview} rating={vote_average} />
        <VideoBackground videoId={id} />
    </div>

  )
}

export default MainContainer