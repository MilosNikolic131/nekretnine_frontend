import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forme.css"
import unk from '../components/unknown.png'
import { Button } from './Button';

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
        <div className="pozadina">
            <div className='forma-info'>
        <div className="forma-n">
        <img className='unk' src={unk} />
        <form onSubmit={handleRegister}>
        <h2>Forma za registraciju</h2>
            <label>Email:</label>
            <input className='forma-input' type="text" required name="email" onInput={handleInput}></input>
            <label>Lozinka:</label>
            <input className='forma-input' type="text" required name="password" onInput={handleInput}></input>
            <Button buttonSize='btn--large' buttonStyle='btn--outline' >
                                Register
                            </Button>
            
        </form>
        </div>
        </div>
        </div>
    );
}

export default DodavanjeKorisnika;