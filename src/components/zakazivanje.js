import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./forme.css"
import noimg from '../components/agent.PNG'
import { Button } from './Button';


const ZakaziObilazak = () => {
    const [agenti, setAgenti] = useState();
    const [nekretnine, setNekretinine] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState({
        imePrezime: "",
        adresa: "",
        datum: ""
    });
    function handleInput(e) {
        let newData = data;
        newData[e.target.name] = e.target.value;
        setData(newData);
    }
    // function testTest(e) {
    //     console.log("bla bla");
    //     console.log(e.target.name);
    //     console.log(e.target.value);
    // }
    let navigate = useNavigate();
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/agent').then(res => {
            if (!res.ok) {
                throw Error('Ne moze se fecovati data');
            }
            return res.json();
        }).then(data => {
            console.log(data);
            setAgenti(data.data);
        }).catch(err => {
            setError(err.message);
        })
    }, []);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/nekretnine').then(res => {
            if (!res.ok) {
                throw Error('Ne moze se fecovati data');
            }
            return res.json();
        }).then(data => {
            console.log(data);
            setNekretinine(data.data);
        }).catch(err => {
            setError(err.message);
        })
    }, []);
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(data);
        // axios.post("http://127.0.0.1:8000/api/obilazak", data).then((res) => {
        //     console.log(res.data);
        //     navigate("/");
        // }).catch(e => {
        //     console.log(e);
        // })
        var axios = require('axios');
        var qs = require('qs');
        var id_agenta = 0;
        for (let index = 0; index < agenti.length; index++) {
            const element = agenti[index];
            if(element.ime_i_prezime == data.imePrezime){
                id_agenta = element.id;
            }
        }
        console.log(id_agenta);
        var id_nekretnine = 0;
        for (let index = 0; index < nekretnine.length; index++) {
            const element = nekretnine[index];
            if(element.Adresa == data.adresa){
                id_nekretnine = element.id;
            }
        }
        console.log(id_nekretnine);
        var sendData = qs.stringify({
            'sifra_agenta': id_agenta + '',
            'sifra_nekretnine': id_nekretnine + '',
            'datum_i_vreme_obilaska': data.datum
        });
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/obilazak',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: sendData
        };
        console.log(sendData);
        console.log(data);
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );
                alert("Uspesno zakazan obilazak: " + JSON.stringify(response.data));
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
            <h2>Forma za zakazivanje obilaska</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Izaberite naseg agenta:</label>

                {agenti && <Combobox aria-label="izaberite agenta..." >
                    <ComboboxInput   className='forma-input' name="imePrezime" onChange={handleInput} onSelect = {handleInput}/>
                    <ComboboxPopover >
                        <ComboboxList>
                            {agenti.map((agent) => (
                                <ComboboxOption value={agent.ime_i_prezime} />
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>}
                <label htmlFor="">Izaberite zeljenu nekretninu:</label>
                {nekretnine && <Combobox aria-label="izaberite agenta..." >
                    <ComboboxInput className='forma-input' required name="adresa" onChange={handleInput} onSelect = {handleInput} />
                    <ComboboxPopover>
                        <ComboboxList>
                            {nekretnine.map((nekretnina) => (
                                <ComboboxOption value={nekretnina.Adresa} />
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>}
                <label htmlFor="">Unesite datum:</label>
                <input className='forma-input' type="text" required name="datum" onInput={handleInput}></input>
                <Button buttonSize='btn--large' buttonStyle='btn--outline' >
                                Zakazi
                            </Button>
            </form>
        </div>
        </div>
        </div>
    );
}

export default ZakaziObilazak;