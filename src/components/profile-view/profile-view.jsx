import { useState, useEffect } from "react"
import { Card, Col, Form, Button } from "react-bootstrap"

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState();
    
    // let favoriteMovies = movies.filter(movie => user.favoriteMovies.includes(movie._id))

    const handleSubmit = event => {
        event.preventDefault();

        const data = JSON.parse(localStorage.getItem('user'))
        
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
                        <p>Username: {Username}</p>
                        <p>Email: {Email}</p>
                        <p>Birthday: {Birthday}</p>
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
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={Username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    minLength="5"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="Password"
                                    value={Password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength="6"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="Email"
                                    value={Email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={Birthday}
                                    onChange={e => setBirthday(e.target.value)}
                                    required
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={12}>
                <h3 className="mt-3 mb-3 text-light">Your favorite movies:</h3>
            </Col>
            {/* {favoriteMovies.map(movie => (
                <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                    <MovieCard movie={movie} />
                </Col> */}
            {/* ))} */}
        </>
    );
}