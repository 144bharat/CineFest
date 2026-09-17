import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ title, posterPath }) => {
  return (
    <div className="size-24 md:size-44">
        <img alt={title} src={ IMG_CDN_URL + posterPath} className="h-full w-full rounded-lg" />
    </div>
  )
}

export default MovieCard