import { useState, useEffect } from "react"
import { Card, Col, Form, Button } from "react-bootstrap"
import bcrypt from "bcryptjs"
import { MovieCard } from "../movie-card/movie-card"

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    // const favoriteMovies = movies.filter(movie => user.favoriteMovies.includes(movie._id))

    const handleSubmit = event => {
        event.preventDefault();

        const hashedPassword = bcrypt.hashSync(Password, 10)

        const data = {
            Username: Username,
            Password: hashedPassword,
            Email: Email,
        }
        
        fetch(`https://agile-beach-16603.herokuapp.com/users/${user.Username}`, {
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
            }
        })
        .catch(e => {
            alert(e);
        });
    }
    const deleteAccount = () => {
        fetch(`https://agile-beach-16603.herokuapp.com/users/${user.Username}`, {
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
                <Card className="mt-1 mb-2">
                    <Card.Body>
                        <Card.Title >Profile</Card.Title>
                        <p>Username: {user.Username}</p>
                        <p>Email: {user.Email}</p>
                    </Card.Body>
                </Card>
                <Button variant="danger" onClick={() => {
                    if (confirm("Are you sure?")) {
                        deleteAccount();
                    }
                }}>Delete user account</Button>
            </Col>
            <Col md={6}>
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title>Update your info</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={Username}
                                    onChange={e => setUsername(e.target.value)}
                                    minLength="5"
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="Password"
                                    value={Password}
                                    onChange={e => setPassword(e.target.value)}
                                    minLength="6"
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="Email"
                                    value={Email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={12}>
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title>Favorite Movies:</Card.Title>
                        {/* {favoriteMovies.map((movies)=>{ */}
                            <Col className="mb-4" key={movies._id}>
                                <MovieCard movie={movies} />
                            </Col> 
                            {/* })} */}
                    </Card.Body>
                </Card>
                
            </Col>
        </>
    );
}