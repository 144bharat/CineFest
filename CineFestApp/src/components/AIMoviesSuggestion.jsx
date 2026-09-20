import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";


const AIMoviesSuggestion = () => {

  // const recommendedMovieList = useSelector(store => store.ai.recommendedMovieList);
  // const aiResponseMovieNameList = useSelector(store => store.ai.aiResponseMovieNameList);


  const recommendedMoviesListData = useSelector(store => store.ai.recommendedMoviesListData);

  
  if(recommendedMoviesListData.length === 0 || recommendedMoviesListData[0].aiMovieTitle === null || recommendedMoviesListData[0].tmdbProvidedMovieList.length === 0){
    return;
  }
  
    // console.log("AIMoviesSuggestion movieList: ");
    // console.log(recommendedMoviesListData);

  return (
    <div className="w-[80%] flex flex-col items-center gap-5">
      <h2 className="font-serif font-bold text-2xl text-white">AI Movie Suggestions</h2>
    
    {
      /*  
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
      */
    }

      <div className="flex gap-4 w-full flex-col">
        {
            recommendedMoviesListData.map((recommendMovieData) => <MoviesList title={recommendMovieData.aiMovieTitle} movies={recommendMovieData.tmdbProvidedMovieList}  key={recommendMovieData.title} />)
        }
      </div>


    </div>
  )
}

export default AIMoviesSuggestion