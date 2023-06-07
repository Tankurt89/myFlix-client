import { useState } from "react";

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
                onLoggedIn(data.user, data.token);
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
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </label>
            <label>
                Password:
                <input
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}