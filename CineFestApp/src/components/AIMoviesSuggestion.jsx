import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const AIMoviesSuggestion = () => {

  const recommendedMovieList = useSelector(store => store.ai.recommendedMovieList);
  // console.log("AIMoviesSuggestion movieList: ");
  // console.log(recommendedMovieList);

  if(recommendedMovieList === null){
    return;
  }
  return (
    <div className="w-[60%] flex flex-col items-center gap-5">
      <h2 className="font-serif font-bold text-2xl text-white">AIMoviesSuggestion</h2>
      
      <div className="flex flex-wrap gap-4 justify-center">
      {
        recommendedMovieList.map((eachMovieList, listIndex) => (
          eachMovieList.results
            .filter(movie => movie.poster_path) // only keep movies with poster_path
            .map(movie => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                className="w-1/4"
              />
            ))
        ))
      }
      </div>
    </div>
  )
}

export default AIMoviesSuggestion