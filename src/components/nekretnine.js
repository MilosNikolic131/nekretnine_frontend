import React from "react";
import { useState, useEffect } from "react";
import { Button } from './Button';
import "./nekretnine.css"
import kuca from '../components/kuca.jpg'

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
        <div className="wrapper">
        <h1>NEKRETNINE U PONUDI</h1>
        
            {dataNekretnine && dataNekretnine.map((nekretnina) => (
            
            <div className="container">



           <div className="desno-box">
           <h2>Adresa</h2>
           <p>{nekretnina.Adresa}</p>
           <h2>Cena po kvadratu</h2>
           <p>{nekretnina.cena_po_kvadratu}</p>
           <h2>Tip Nekretnine</h2>
           <p>{nekretnina.tip_nekretnine.naziv}</p>
           <h2>Agent zaduzen za nekretninu</h2>
           <p>{nekretnina.Agent.ime_i_prezime}</p>
           </div>

           <div className="levo-box">
           <img className='slika-levo' src={kuca} />
           </div>

           {(() => {
               if (window.sessionStorage.ulogovan == "agent") {
                   return (
                       // <button onClick={() => handleDelete(nekretnina.id)}>Obrisi</button>
                       <Button buttonSize='btn--large' buttonStyle='btn--primary' onClick={() => handleDelete(nekretnina.id)} >
                       Obrisi
                   </Button>
                   )
               }
           })()}
           
           </div> 
           
           
            ))}
        
            </div>
        

    );

}
export default Nekretnine;

{/* <div>
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
            // <button onClick={() => handleDelete(nekretnina.id)}>Obrisi</button>
            <Button buttonSize='btn--large' buttonStyle='btn--primary' onClick={() => handleDelete(nekretnina.id)} >
            Obrisi
        </Button>
        )
    }
})()}
<hr></hr>
</div> */}