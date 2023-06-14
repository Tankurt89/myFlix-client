import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'

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

    return(
        <Row className="justify-content-md-center">
        { !user ? (
            <Col md={5}>
            <h2>Login</h2>
            <LoginView onLoggedIn={(user, token) => {setUser(user), setToken(token)}}/>
            <h2>Register</h2>
            <SignupView />
            </Col>
        ) : selectedMovie ? (
        <Col md={8}>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
        ) : movies.length === 0 ? (
        <>
        <div>The list is empty!</div>;
        </>
        ) : (
        <>
            {movies.map((movie) => (
                <Col className="mb-5" key={movie._id} md={3}>
                <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
                </Col>
            ))}
        <Col md="12">
        <Button variant="danger" onClick={() => { setUser(null); setToken(null), localStorage.clear() }}>Logout</Button>
        </Col>
        </>
        )}
        </Row>
    )
}
