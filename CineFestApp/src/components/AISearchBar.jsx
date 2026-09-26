import { motion } from "framer-motion";
import { useState } from "react";

import { searchMoviesWithAI } from "../utils/gemini";
import { TMDB_API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addRecommendedMoviesListData, emptyRecommendedMoviesListData } from "../utils/Slices/AISlice"; //addAIResponseMovieNameList, addRecommendedMovieList, 

import { useSelector } from "react-redux";
import { lang } from "../utils/language";

const AISearchBar = () => {

  const langKey = useSelector(store => store.ai.language);

  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [isErrorOccuredFromAi, setIsErrorOccuredFromAi] = useState(false);
  const dispatch = useDispatch();

  const fetchTMDBMovieByMovieName = async (movieName) => {
      const dataStream = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movieName +'&include_adult=false&page=1', TMDB_API_OPTIONS);
      const data = await dataStream.json();
      //return data;

      dispatch(addRecommendedMoviesListData({
        aiMovieTitle: movieName,
        tmdbProvidedMovieList: data?.results
      }))
  }

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setIsSearching(true);
    
    try {

      dispatch(emptyRecommendedMoviesListData());
      const aiSuggestions = await searchMoviesWithAI(searchText);

      //dispatch(addAIResponseMovieNameList(aiSuggestions));

      //const movieArrayInFormOfPromise = aiSuggestions.map(movieName => fetchTMDBMovieByMovieName(movieName));
      aiSuggestions.map(movieName => fetchTMDBMovieByMovieName(movieName));

      //Now I need to use Promise.all(movieArrayInFormOfPromise); // When all resolve then only move ahead and provide data.
      //const recommendedMovieList = await Promise.all(movieArrayInFormOfPromise);
      
      //dispatch(addRecommendedMovieList(recommendedMovieList));

      setIsErrorOccuredFromAi(false);
      setIsSearching(false);


    } catch (error) {
      console.error("AI movie search failed:", error);
      setIsErrorOccuredFromAi(true);
      setIsSearching(false);
    }

  };

  return (
    // <div className="w-[80%] flex gap-2">
    //     <input type="text" placeholder="Smart movie suggestions: let’s find a film..."
    //     className="w-5/6 bg-midnight/90 p-5 rounded-lg rounded-r-none placeholder-white text-white"
    //     />
    //     <button className="w-1/6 bg-primary hover:bg-primary/70 p-5 rounded-lg rounded-l-none text-white">Search</button>
    // </div>

    <motion.div
      className="w-[50%] flex gap-2"
      animate={{
        scale: isFocused ? 1.015 : 1,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="w-10/12 rounded-lg rounded-r-none flex flex-col gap-1"
        animate={{
          boxShadow: isFocused
            ? "0 0 0 2px rgba(255,255,255,0.12), 0 0 25px rgba(255,255,255,0.08)"
            : "0 0 0 0px rgba(255,255,255,0)",
        }}
      >
        <input
          type="text"
          placeholder={lang[langKey].aiSearchPlaceholder}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-midnight/90 p-3 rounded-lg rounded-r-none
                     placeholder-white/80 text-white outline-none"
        />

        {
          isErrorOccuredFromAi && 
          <p className="text-red-500 text-md italic">We couldn’t fetch movie recommendations at the moment. Please try again later.</p>
        }
      </motion.div>

      <motion.button
        onClick={handleSearch}
        disabled={isSearching}
        className="w-2/12 bg-primary hover:bg-primary/70
                   p-3 rounded-lg rounded-l-none text-white"
        whileHover={!isSearching ? { y: -2 } : {}}
        whileTap={!isSearching ? { scale: 0.95 } : {}}
      >
        {isSearching ? (
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
          >
            Searching...
          </motion.span>
        ) : (
          lang[langKey].search

        )}
      </motion.button>
    </motion.div>

  )
}

export default AISearchBar;