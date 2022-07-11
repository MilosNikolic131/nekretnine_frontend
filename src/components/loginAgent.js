import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forme.css"
import agent from '../components/agent.PNG'
import { Button } from './Button';



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
        <div className="pozadina">
        <div className='forma-info'>
        <div className="forma-n">
        <img className='no-img' src={agent} />
        <form onSubmit={handleLogin}>
        <h2>Forma za logovanje kao agent</h2>
            <label>JMBG:</label>
            <input className='forma-input' type="text" required name="JMBG" onInput={handleInput}></input>
            <label>Lozinka:</label>
            <input className='forma-input' type="text" required name="password" onInput={handleInput}></input>
            <Button buttonSize='btn--large' buttonStyle='btn--outline' >
                                Login
                            </Button>
            <br></br>
            <br></br>
            <br></br>
            <a href="/login">Zelite da se ulogujete kao korisnik?</a>
        </form>
        </div>
        </div>
        </div>
    );
}

export default LoginAgent;