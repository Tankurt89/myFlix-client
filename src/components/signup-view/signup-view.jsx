import { useState } from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap'

export const SignupView = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {event.preventDefault();
        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        }
        fetch('https://agile-beach-16603.herokuapp.com/users', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
              alert('Signup successful');
              window.location.reload();
            } else {
              alert('Signup failed');
            }
          });
        };

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group  controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                style={{border:"2px solid black"}}
                                type="text"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength="5"
                                placeholder="Username must be 5 or more characters"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                style={{border:"2px solid black"}}
                                type="password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6"
                                placeholder="Password must be 6 or more characters"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                style={{border:"2px solid black"}}
                                type="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email address"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                style={{border:"2px solid black"}}
                                type="date"
                                value={Birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}