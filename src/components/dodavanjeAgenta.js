import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forme.css"
import noimg from '../components/agent.PNG'
import { Button } from './Button';


const DodavanjeAgenta = () => {
    
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
     
        var axios = require('axios');
    var qs = require('qs');
    var sendData = qs.stringify({
        'ime_i_prezime': data.ime_i_prezime + '',
        'password': data.password + '',
        'JMBG': data.JMBG + ''
    });
    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/dodajagenta',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.auth_token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: sendData
    };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );
                alert("Dodat agent: " + JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="pozadina">
        <div className='forma-info'>
        <div className="forma-n">
        <img className='no-img' src={noimg} />
        <h2>Forma za dodavanje agenta</h2>
        <form onSubmit={handleRegister}>
            <label>Ime i prezime:</label>
            <input className='forma-input' type="text" required name="ime_i_prezime" onInput={handleInput}></input>
            <label>JMBG:</label>
            <input className='forma-input' type="text" required name="JMBG" onInput={handleInput}></input>
            <label>Lozinka:</label>
            <input className='forma-input' type="text" required name="password" onInput={handleInput}></input>
            <Button buttonSize='btn--large' buttonStyle='btn--outline' >
                                Dodaj agenta
                            </Button>
            <br></br>
        </form>
        </div>
        </div>
        </div>
    );
}

export default DodavanjeAgenta;