import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const DodavanjeAgenta = () => {
    // const [email, setEmail] = useState('');
    // const [korisnickoIme, setkorisnickoIme] = useState('');
    // const [Lozinka, setLozinka] = useState('');
    // const [grad, setGrad] = useState('');
    const [data, setData] = useState({
        ime_i_prezime: "",
        password: "",
        JMBG: ""
    });
    let navigate = useNavigate();
    function handleInput(e) {
        let newData = data;
        newData[e.target.name] = e.target.value;
        setData(newData);
    }
    function handleRegister(e) {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/register", data).then((res) => {
            console.log(res.data);
            navigate("/login");
        }).catch(e => {
            console.log(e);
        })
    }
    return (
        <div className="forma-n">
        <form onSubmit={handleRegister}>
            <label>Ime i prezime:</label>
            <input type="text" required name="ime_i_prezime" onInput={handleInput}></input>
            <label>JMBG:</label>
            <input type="text" required name="JMBG" onInput={handleInput}></input>
            <label>Lozinka:</label>
            <input type="text" required name="password" onInput={handleInput}></input>
            <button>Dodaj agenta</button>
            <br></br>
        </form>
        </div>
    );
}

export default DodavanjeAgenta;