import React from "react";
import { useState, useEffect } from "react";

const Nekretnine = () => {
    const [error,SetError] = useState();
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
                        <hr></hr>
                </div>
            ))}
</div>
      
    );

}
export default Nekretnine;