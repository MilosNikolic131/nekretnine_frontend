import React from "react";
import { useState, useEffect } from "react";

const Nekretnine = () => {
    const [error, SetError] = useState();
    const [dataNekretnine, setData] = useState();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/nekretnine').then(res => {
            if (!res.ok) {
                throw Error('Ne moze se fecovati data');
            }
            return res.json();
        }).then(data => {
            console.log("blabla");
            console.log(data);
            console.log(data.data);
            setData(data.data);
        }).catch(err => {
            SetError(err.message);
        })
    }, []);

    const handleDelete = (props) => {
        const nekretnineID = props;
        console.log(nekretnineID);
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({

        });
        var config = {
            method: 'delete',
            url: 'http://127.0.0.1:8000/api/nekretnine/' + nekretnineID,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.auth_token
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                alert("Obrisana nekretnina sa id-jem: " + nekretnineID);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div>
            {dataNekretnine && dataNekretnine.map((nekretnina) => (
                <div>
                    <h2>Adresa</h2>
                    <p>{nekretnina.Adresa}</p>
                    <h2>Cena po kvadratu</h2>
                    <p>{nekretnina.cena_po_kvadratu}</p>
                    <h2>Tip Nekretnine</h2>
                    <p>{nekretnina.tip_nekretnine.naziv}</p>
                    <h2>Agent zaduzen za nekretninu</h2>
                    <p>{nekretnina.Agent.ime_i_prezime}</p>
                    {(() => {
                        if (window.sessionStorage.ulogovan == "agent") {
                            return (
                                <button onClick={() => handleDelete(nekretnina.id)}>Obrisi</button>
                            )
                        }
                    })()}
                    <hr></hr>
                </div>
            ))}
        </div>

    );

}
export default Nekretnine;