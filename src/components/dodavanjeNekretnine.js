import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forme.css"
import noimg from '../components/agent.PNG'
import { Button } from './Button';



const DodavanjeNekretnine = () => {
    const [data, setData] = useState({
        adresa: "",
        cena_po_kvadratu: "",
        tip_nekretnine: "",
        agent_zaduzen_za_nekretninu: ""
    });
    let navigate = useNavigate();
    function handleInput(e) {
        let newData = data;
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

   
    function handleKreiraj(e) {
        e.preventDefault();
        console.log(window.sessionStorage.auth_token);
        console.log(data.adresa);
        console.log(data.agent_zaduzen_za_nekretninu);

        var axios = require('axios');
        var qs = require('qs');
        var sendData = qs.stringify({
            'Adresa': data.adresa + '',
            'cena_po_kvadratu': data.cena_po_kvadratu + '',
            'tip_nekretnine': data.tip_nekretnine + '',
            'agent_zaduzen_za_nekretninu': data.agent_zaduzen_za_nekretninu + ''
        });
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/dodajnekretninu',
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
                alert("Dodata nekretnina: " + JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="pozadina">
        <div className='forma-info'>
        <div className="forma-n">
       
        <h2>Forma za dodavanje nekretnine</h2>
            <form onSubmit={handleKreiraj}>
                <label>Adresa:</label>
                <input className='forma-input' type="text" required name="adresa" onInput={handleInput}></input>
                <label>Cena po kvadratu:</label>
                <input className='forma-input' type="text" required name="cena_po_kvadratu" onInput={handleInput}></input>
                <label>Tip nekretnine:</label>
                <input className='forma-input' type="text" required name="tip_nekretnine" onInput={handleInput}></input>
                <label>Agent zaduzen za nekretninu:</label>
                <input className='forma-input' type="text" required name="agent_zaduzen_za_nekretninu" onInput={handleInput}></input>
                <Button buttonSize='btn--large' buttonStyle='btn--outline' >
                                Dodaj nekretninu
                            </Button>
            </form>
        </div>
        </div>
        </div>
    );
}

export default DodavanjeNekretnine;