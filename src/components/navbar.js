import { Link } from 'react-router-dom';
import { axios } from "axios";
const Navbar = ({ token }) => {
    function handleLogout() {

        // axios.post("http://127.0.0.1:8000/api/logout", null).then((res) => {
        //     navigate("/");
        // }).catch(e => {
        //     console.log(e);
        // })

        fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + window.sessionStorage.auth_token },
            body: null
        }).then(() => {
            console.log("logout successful");
            console.log(window.sessionStorage.auth_token);
        });



        // var config = {
        //     method: 'post',
        //     url: 'http://127.0.0.1:8000/api/logout',
        //     headers: {
        //         Authorization: 'Bearer ' + window.sessionStorage.token,
        //     },

        // };

        // axios(config)
        //     .then(function (response) {
        //         window.sessionStorage.setItem("auth_token", null);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

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
                'Authorization': 'Bearer 2|w2BuwEdgTmAxtoy9o7IdOYmV3sDJgYMl8XQUBiht'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <nav className="navbar">
            <h1>Glavni meni</h1>
            <div className="links">
                <Link to="/">Pocetna</Link>
                <Link to="/agenti">Agenti</Link>
                <Link to="/nekretnine" >Nekretnine</Link>
                <Link to="/zakazivanje">Zakazi obilazak</Link>
                {/* <Link to="/login">Log in</Link>
                <Link to="/" onClick={handleLogout}>Logout</Link> */}
                {window.sessionStorage.auth_token == null ? <Link to="/login">Log In</Link> : <Link to="/" onClick={handleLogout2}>Logout</Link>}
                {/* if(window.sessionStorage.auth_token == null){
                    <Link to="/login">Log In</Link>
                } else{
                    <Link onClick={handleLogout}>Logout</Link>
                } */}
                <Link to="/dodavanjeagenta" >Dodaj agenta</Link>
                <Link to="/dodavanjenekretnina" >Dodaj nekretninu</Link>
                <Link to="/registerkorisnik" >Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;