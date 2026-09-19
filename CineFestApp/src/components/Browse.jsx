import useNowPlayingMovies from "../utils/customHooks/useNowPlayingMovies";
import Header from "./Header";
import { useSelector } from "react-redux";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import AISearchPage from "./AISearchPage";

const Browse = () => {

//This hook is created to handle now playing movies fetch directly from TMDB api and add them into redux store.
    useNowPlayingMovies();
  const isShowSearchPage = useSelector(store => store.ai.isShowSearchPage);
    return (
        <div>
            <Header />
            
            {/* 
                1. Main Container
                    - Video Background
                    - Video Title

                2. Secondary Container
                    - List of Movies
                     - In Form Of Cards

            */}
            {
                isShowSearchPage? <AISearchPage /> : 
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>
            }
        </div>
    )
}
export default Browse;