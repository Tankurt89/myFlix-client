import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//MovieCard export that has the information that will be displayed on the card that is viewable from the main page and from the profile view page as well. Also contains an open button that links to the movie view with a coded url that is the movie ID
export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
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
}