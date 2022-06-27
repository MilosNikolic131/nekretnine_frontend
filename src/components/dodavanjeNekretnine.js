import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        axios.post("http://127.0.0.1:8000/api/dodajnekretninu", data).then((res) => {
            console.log(res.data);
            navigate("/nekretnine");
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div className="forma-n">
        <form onSubmit={handleKreiraj}>
            <label>Adresa:</label>
            <input type="text" required name="adresa" onInput={handleInput}></input>
            <label>Cena po kvadratu:</label>
            <input type="text" required name="cena_po_kvadratu" onInput={handleInput}></input>
            <label>Tip nekretnine:</label>
            <input type="text" required name="tip_nekretnine" onInput={handleInput}></input>
            <label>Agent zaduzen za nekretninu:</label>
            <input type="text" required name="agent_zaduzen_za_nekretninu" onInput={handleInput}></input>
            <button>Dodaj nekretninu</button>
        </form>
        </div>
    );
}

export default DodavanjeNekretnine;