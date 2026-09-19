import AIMoviesSuggestion from "./AIMoviesSuggestion";
import AISearchBar from "./AISearchBar";

const AISearchPage = () => {
  return (
    // w-screen [temp]
    <div className="h-screen w-full bg-midnight/80">AISearchPage
    <div className="flex flex-col gap-5 mt-[10%] justify-center items-center bg-midnight/80">
      <AISearchBar />
      <AIMoviesSuggestion />
    </div>
    </div>
  )
}

export default AISearchPage;