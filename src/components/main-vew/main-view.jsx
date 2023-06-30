import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Button, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] =useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")

    const updateUser = user => {
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
    }

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

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null)
                    setToken(null)
                    localStorage.clear()
                    path="/login"
                }}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                        <>
                            {user ? (
                            <Navigate to="/" />
                            ) : (
                            <Col md={5}>
                                <SignupView />
                            </Col>
                            )}
                        </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token)}}  />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                            {!user ? (
                                <Navigate to="/login" replace/>
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <Col md={8}>
                                    <MovieView movies={movies} user={user} token={token} updateUser={updateUser}/>
                                </Col>
                                )} 
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <>
                                {movies.filter((movie) => movie.Title.toLowerCase().includes(searchQuery.toLowerCase()
                                ) || 
                                movie.Genre.Name.toLowerCase().includes(searchQuery.toLowerCase()
                                ) ||
                                movie.Director.Name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((movie) => (
                                    <Col className="mb-5" key={movie.id} md={3}>
                                        <MovieCard
                                        movie={movie}/>
                                    </Col>
                                    ))}
                                </>
                            )}
                            </>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <>
                            {!user ? (
                                <Col>
                                    <Navigate to="login" replace />
                                </Col>
                            ) : (
                                <ProfileView user={user}  token={token} movies={movies} onLoggedOut={() => {
                                    setUser(null)
                                    setToken(null)
                                    localStorage.clear()
                                    path="/"
                                    path="/login"
                                }} updateUser={updateUser}/>
                            )
                            }
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
}

