import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// var axios = require('axios');
// var qs = require('qs');
// var data = qs.stringify({
//     'Adresa': 'Resavska 25',
//     'cena_po_kvadratu': '4300',
//     'tip_nekretnine': '1',
//     'agent_zaduzen_za_nekretninu': '1'
// });
// var config = {
//     method: 'post',
//     url: 'http://127.0.0.1:8000/api/dodajnekretninu',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Bearer 6|SkkOYCUQcJlKrDlM4zniUoWwsNa3GrJ8sk7NelFO',
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: data
// };

// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });



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

    //const [finalData, setFinalData] = useState("");

    // var axios = require('axios');
    // var qs = require('qs');
    // var sendData = qs.stringify({
    //     'Adresa': data.adresa + '',
    //     'cena_po_kvadratu': data.cena_po_kvadratu + '',
    //     'tip_nekretnine': data.tip_nekretnine + '',
    //     'agent_zaduzen_za_nekretninu': data.agent_zaduzen_za_nekretninu + ''
    // });
    // var config = {
    //     method: 'post',
    //     url: 'http://127.0.0.1:8000/api/dodajnekretninu',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Authorization': 'Bearer ' + window.sessionStorage.auth_token,
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     data: sendData
    // };

    // axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
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
        // setFinalData(qs.stringify({
        //     'Adresa': data.adresa + '',
        //     'cena_po_kvadratu': data.cena_po_kvadratu + '',
        //     'tip_nekretnine': data.tip_nekretnine + '',
        //     'agent_zaduzen_za_nekretninu': data.agent_zaduzen_za_nekretninu + ''
        // }))
        // axios.post("http://127.0.0.1:8000/api/dodajnekretninu", data).then((res) => {
        //     console.log(res.data);
        //     navigate("/nekretnine");
        // }).catch(e => {
        //     console.log(e);
        // })
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