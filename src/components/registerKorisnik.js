import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const DodavanjeKorisnika = () => {
    // const [email, setEmail] = useState('');
    // const [korisnickoIme, setkorisnickoIme] = useState('');
    // const [Lozinka, setLozinka] = useState('');
    // const [grad, setGrad] = useState('');
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
    function handleRegister(e) {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/registerkorisnik", data).then((res) => {
            console.log(res.data);
            navigate("/login");
        }).catch(e => {
            console.log(e);
        })
    }
    return (
        <div className="forma-n">
        <form onSubmit={handleRegister}>
            <label>Email:</label>
            <input type="text" required name="email" onInput={handleInput}></input>
            <label>Lozinka:</label>
            <input type="text" required name="password" onInput={handleInput}></input>
            <button>Register</button>
            <br></br>
            <a href="/dodavanjeagenta">Zelite da dodate agenta?</a>
        </form>
        </div>
    );
}

export default DodavanjeKorisnika;