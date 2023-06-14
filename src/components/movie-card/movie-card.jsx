import PropTypes from "prop-types";
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick(movie)} style={{ cursor: "pointer" }}>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Director: PropTypes.objectOf(PropTypes.string).isRequired,
        Genre: PropTypes.objectOf(PropTypes.string).isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
}