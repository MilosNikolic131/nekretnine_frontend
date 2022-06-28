import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginAgent = ({ addToken }) => {
    const [data, setData] = useState({
        JMBG: "",
        password: ""
    });
    let navigate = useNavigate();
    function handleInput(e) {
        let newData = data;
        newData[e.target.name] = e.target.value;
        setData(newData);
    }
    function handleLogin(e) {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/login", data).then((res) => {
            console.log(res.data);
            window.sessionStorage.setItem("auth_token", res.data.token);
            window.sessionStorage.setItem("ulogovan","agent");
            addToken(res.data.token);
            console.log(window.sessionStorage.auth_token);
            console.log("break");
            console.log(window.sessionStorage.getItem("auth_token"));
            navigate("/");
        }).catch(e => {
            console.log(e);
        })
    }
    return (
        <div className="forma-n">
        <form onSubmit={handleLogin}>
            <label>JMBG:</label>
            <input type="text" required name="JMBG" onInput={handleInput}></input>
            <label>Lozinka:</label>
            <input type="text" required name="password" onInput={handleInput}></input>
            <button>Login</button>
            <br></br>
            <a href="/login">Zelite da se ulogujete kao korisnik?</a>
        </form>
        </div>
    );
}

export default LoginAgent;