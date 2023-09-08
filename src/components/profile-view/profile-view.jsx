import { useState, useEffect } from "react"
import { Card, Col, Form, Button } from "react-bootstrap"
import bcrypt from "bcryptjs"
import { MovieCard } from "../movie-card/movie-card"

export const ProfileView = ({ token, movies, onLoggedOut, updateUser }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Info, setInfo ] = useState("")
    const [favoriteMovies, setFavoriteMovies] = useState([])
    // moved the filter function to inside the useEffect because of  an error that was causing it to not load correctly. Upon moving it there and then setting up a useSate it caused the it to function as intended. 
    const storedUser = JSON.parse(localStorage.getItem("user"))

    //this use effect returns all the information stored in the token which will allow me to use that further down to display the users Username and Email on the profile page. 
    useEffect(() => {
        if(!token){
            return;}
        fetch(`https://agile-beach-16603.herokuapp.com/users/${storedUser}`, {headers: {Authorization: `bearer ${token}`}})
        .then((response) => response.json())
        .then((storedInfo) => {
            setInfo(storedInfo)
            setFavoriteMovies(movies.filter(movie => storedInfo.FavoriteMovies.includes(movie._id)))
            console.log(storedInfo)
        })
        .catch((error) => {
            console.log('Error fetching user:', error)
        })
    }, [token])

    const handleSubmit = event => {
        // event.preventDefault();

       

        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
        }

        //this fetch/put allows the user to update their user information
        fetch(`https://agile-beach-16603.herokuapp.com/users/${storedUser}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Changing profile failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully changed profile");
                updateUser(user);
                onLoggedOut()
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    //allows the user to delete their account
    const deleteAccount = () => {
        fetch(`https://agile-beach-16603.herokuapp.com/users/${storedUser}`, {
            method: "DELETE",
            headers: { Authorization: `bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                alert("Your account has been deleted.");
                onLoggedOut();
            } else {
                alert("Could not delete account");
            }
        })
        .catch(e => {
            alert(e);
        });
    }
    return (
        <>
            <Col md={6}>           
                <Card className="mt-2 mb-3">
                    {/* This calls on the information that we had gathered earlier to display the users Username and Email  */}
                    <Card.Body>
                        <Card.Title >Profile</Card.Title>
                        <p>Username: {Info.Username}</p>
                        <p>Email: {Info.Email}</p>
                        {/* Added this button that will allow the user to delete their account only after confirming that is what they want to do */}
                        <Button variant="danger" onClick={() => {
                    if (confirm("Are you sure?")) {
                        deleteAccount();
                    }
                }}>Delete user account</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6}>
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        {/* This section allows the user to update their username/password/email, all sections are required to be filled out  */}
                        <Card.Title>Update your info</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={Username}
                                    onChange={e => setUsername(e.target.value)}
                                    minLength="5"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={Password}
                                    onChange={e => setPassword(e.target.value)}
                                    minLength="6"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="Email"
                                    value={Email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <>After changing information you will be asked to login again.</>
                            <br></br>
                            <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={12}>
                <Card>
                    <Card.Body>
                        {/* Displays the movie card of the movies that the user has set as their favorite and allows them to go to the movie view where they can remove if they please */}
                        <Card.Title>Favorite Movies:</Card.Title>
                        {favoriteMovies.map((movie)=>(
                            <Col className="mb-5" key={movie.id} md={12}>                            
                            <MovieCard movie={movie}></MovieCard>
                        </Col>
                        ))}
                    </Card.Body>
                </Card>
                
            </Col>
        </>
    );
}