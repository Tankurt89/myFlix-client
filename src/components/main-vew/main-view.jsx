import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] =useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if(!token){
            return;}
        fetch("https://agile-beach-16603.herokuapp.com/movies", {headers: {Authorization: `bearer ${token}`}})
        .then((response) => response.json())
        .then((data) => {
            console.log('data', data);
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
    }, [token])

    if (!user) {
        return (
            <>
            <LoginView onLoggedIn={(user, token) => {setUser(user), setToken(token)}} />
            or
            <SignupView />
            </>
        )
    }

    if (selectedMovie) {
    return (
        <>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </>
        );
    }

    if (movies.length === 0) {
        return(
        <>
        <button onClick={() => { setUser(null); setToken(null), localStorage.clear(); }}>Logout</button>
        <div>The list is empty!</div>;
        </>
        );
    }
    return (
        <div>
            <button onClick={() => { setUser(null); setToken(null), localStorage.clear() }}>Logout</button>
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