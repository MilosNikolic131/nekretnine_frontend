import { Link } from 'react-router-dom';
import { axios } from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import './navbar.css';


const Navbar = ({ token }) => {
    function handleLogout() {

        

        fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + window.sessionStorage.auth_token },
            body: null
        }).then(() => {
            console.log("logout successful");
            console.log(window.sessionStorage.auth_token);
        });



        
    }

    const [timer, setTimer] = useState(false);

    function handleLogout2() {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({

        });
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/logout',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.auth_token
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.sessionStorage.auth_token = null;
                window.sessionStorage.ulogovan = null;
                setTimer(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (

        <nav className="navbar">
            <Link to="/"><h1>NEKRETNINE MNM</h1></Link>
            <div className="links">
                <Link to="/">Pocetna</Link>
                <Link to="/agenti">Agenti</Link>
                <Link to="/nekretnine" >Nekretnine</Link>
                <Link to="/zakazivanje">Zakazi obilazak</Link>
                {(() => {
                    if (window.sessionStorage.ulogovan == "agent") {
                        return (
                            <div className='navbarDivovi'>
                                <Link to="/dodavanjeagenta" >Dodaj agenta</Link>
                                <Link to="/dodavanjenekretnina" >Dodaj nekretninu</Link>
                            </div>
                        )
                    }
                })()}
                {(() => {
                    if (window.sessionStorage.auth_token == null || window.sessionStorage.auth_token == 'null') {
                        return (
                            <div className='navbarDivovi'>
                                <Link to="/login">Log In</Link>
                                <Link to="/registerkorisnik" >Register</Link>
                            </div>
                        )
                    } else {
                        return (
                            <Link to="/" onClick={handleLogout2}>Logout</Link>
                        )
                    }
                })()}
               
            </div>
        </nav>


    );
}

export default Navbar;