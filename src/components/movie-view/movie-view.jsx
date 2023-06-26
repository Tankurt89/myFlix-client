import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';
import { useEffect, useState } from "react"
import { Button } from 'react-bootstrap';



export const MovieView = ({ movies, user, token, updateUser }) => {
    const { movieId } = useParams()
    console.log(movies)
    const movie = movies.find((m) => m._id === movieId);

    // const [isFavMovie, setIsFavMovie] = useState(
    //     user?.favoriteMovies?.includes(movie?._id) || false
    // )
    
    useEffect(() => {
        setIsFavMovie(user?.favoriteMovies?.includes(movie?._id) || false)
    }, [movieId])

    const addFavMovie = () => {
        fetch(`https://agile-beach-16603.herokuapp.com/users/${user}/movies/${movieId}`,
        {
            method: "POST",
            headers: { Authorization: `bearer ${token}`}
        })
        .then((response) => {
            if(response.ok){
                return response.json()
            }
            else{
                alert("Failed to add to Favorites")
                return false
            }
        })
        .then((user) => {
            alert("Successfully added to Favorites")
            setIsFavMovie(true)
            updateUser(user)
        })
    }

    const removeFavMovie = () => {
        fetch(`https://agile-beach-16603.herokuapp.com/users/${user}/movies/${movieId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              alert("Failed to remove movie from Favorites");
              return false;
            }
          })
          .then((user) => {
            alert("Successfully deleted movie from Favorites!");
            setIsFavMovie(false);
            updateUser(user);
          })
          .catch((e) => {
            alert(e);
          });
      };
    
    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movies.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <br></br>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>  
            </div>
            <div>
                <span>Genre Description:</span>
                <span>{movie.Genre.Description}</span>
            </div>
            <br></br>
            <div>
                <span>Director:</span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Bio:</span>
                <span>{movie.Director.Bio}</span>
            </div>
            <div>
                <span>Birth:</span>
                <span>{movie.Director.Birth}</span>
            </div>
            <div>
                <span>Death:</span>
                <span>{movie.Director.Death}</span>
            </div>
            <br></br>
            <Link to={'/'}>
                <Button className="back-button">Back</Button>
            </Link>
            <p></p>
            {isFavMovie? (
                <Button variant="danger"onClick={removeFavMovie}>Remove from Favorites</Button>):(
                <Button variant="success" onClick={addFavMovie}>Add to Favorites</Button>
            )}
        </div>
    )
}
