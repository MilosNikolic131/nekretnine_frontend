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
import Kalendar from "./calender";

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
        axios.post("http://127.0.0.1:8000/api/obilazak", data).then((res) => {
            console.log(res.data);
            navigate("/");
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div className="forma-n">
            <h2>Forma za zakazivanje obilaska</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Izaberite naseg agenta:</label>

                {agenti && <Combobox aria-label="izaberite agenta...">
                    <ComboboxInput />
                    <ComboboxPopover>
                        <ComboboxList>
                            {agenti.map((agent) => (
                                <ComboboxOption value={agent.ime_i_prezime} onChange={handleInput} />
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>}
                <label htmlFor="">Izaberite zeljenu nekretninu:</label>
                {nekretnine && <Combobox aria-label="izaberite agenta...">
                    <ComboboxInput />
                    <ComboboxPopover>
                        <ComboboxList>
                            {nekretnine.map((nekretnina) => (
                                <ComboboxOption value={nekretnina.Adresa} onChange={handleInput}  />
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>}
                <label htmlFor="">Unesite datum:</label>
                <input type="text" required name="datum" onInput={handleInput}></input>
                {/* <Kalendar></Kalendar> */}
                <button>Zakazi</button>
            </form>
        </div>
    );
}

export default ZakaziObilazak;