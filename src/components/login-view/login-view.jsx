import { useState } from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap'

export const LoginView = ({ onLoggedIn }) =>{
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: Username,
            Password: Password
        }
        fetch("https://agile-beach-16603.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then ((response) => response.json())
        .then((data) =>{
            console.log("Login response: ", data);
            if (data) {
                localStorage.setItem("user", JSON.stringify(data.username));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.username, data.token);
            }
            else{
                alert("No such user");
            }

        })
        .catch((e) => {
            alert("Something went wrong")
        })
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                style={{border:"2px solid black"}}
                                type="text"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
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