import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://agile-beach-16603.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const moviesFromApi = data.map((movies) => {
                return{
                    _id: movies._id,
                    Title: movies.Title,
                    Description: movies.Description,
                    Genre:{
                        Name: movies.Genre.Name,
                        Description: movies.Genre.Description
                    },
                    Director:{
                        Name: movies.Director.Name,
                        Bio: movies.Director.Bio,
                        Birth: movies.Director.Birth,
                        Death: movies.Director.Death
                    },
                }
            })
            setMovies(moviesFromApi);
        })
        .catch((error) => {
            console.log('Error fetching movies:', error)
        })
    }, [])

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    )
};