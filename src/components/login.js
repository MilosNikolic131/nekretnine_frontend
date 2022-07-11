import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forme.css"
import korisnik from '../components/korisnik.jpg'
import { Button } from './Button';


const Login = ({ addToken }) => {
    const [data, setData] = useState({
        email: "",
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
        axios.post("http://127.0.0.1:8000/api/loginkorisnik", data).then((res) => {
            console.log(res.data);
            window.sessionStorage.setItem("auth_token", res.data.token);
            window.sessionStorage.setItem("ulogovan","user");
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
        <div className="pozadina">
        <div className='forma-info'>
        <div className="forma-n">
        <img className='no-img' src={korisnik} />
        <form onSubmit={handleLogin}>
        <h2>Forma za logovanje korisnika</h2>
            <label>Email:</label>
            <input  className='forma-input' type="text" required name="email" onInput={handleInput}></input>
            <label>Lozinka:</label>
            <input className='forma-input' type="text" required name="password" onInput={handleInput}></input>
            <Button buttonSize='btn--large' buttonStyle='btn--outline' >
                                Login
                            </Button>
            <br></br>
            <br></br>
            <br></br>

            <a href="/loginAgent">Zelite da se ulogujete kao agent?</a>
        </form>
        </div>
        </div>
        </div>
    );
}

export default Login;