import MovieCard from "./MovieCard";

const MoviesList = ({ title, movies }) => {
    
  if(movies === null){
    return;
  }
  return (
    <div>
        <h1 className="font-bold font-serif italic pt-5 text-white">{title}</h1>
        <div className="flex overflow-x-scroll scrollbar-hide">
            <div className="flex gap-5 p-5">
                {movies.map(movie => <MovieCard title={movie?.original_title} posterPath={movie?.poster_path} key={movie?.id} />)}
            </div>
        </div>
    </div>
  )
}

export default MoviesList;