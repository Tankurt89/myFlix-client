import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div 
        onClick={() => {
            onMovieClick(movie);
        }}
        >
        {movie.Title}
        </div>
    )
}

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Director: PropTypes.arrayOf(PropTypes.string).isRequired,
        Genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
}