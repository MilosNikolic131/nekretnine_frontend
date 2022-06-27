
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pocetna from './components/pocetna';
import Login from './components/login';
import { useState } from "react";
import Agenti from './components/agenti';
import ZakaziObilazak from './components/zakazivanje';
import Nekretnine from './components/nekretnine';
import DodavanjeNekretnine from './components/dodavanjeNekretnine';
import DodavanjeAgenta from './components/dodavanjeAgenta';
import LoginAgent from './components/loginAgent';
import DodavanjeKorisnika from './components/registerKorisnik';
function App() {
  const [token, setToken] = useState();
  function addToken(auth_token) {
    setToken(auth_token);
  }
  return (
    <Router>
      <Navbar token = {token}></Navbar>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Pocetna />} />
          <Route exact path="/agenti" element={<Agenti />} />
          <Route exact path="/login" element={<Login addToken={addToken} />} />
          <Route exact path="/dodavanjeagenta" element={<DodavanjeAgenta/>} />
          <Route exact path="/registerkorisnik" element={<DodavanjeKorisnika/>} />
          <Route exact path="/zakazivanje" element={<ZakaziObilazak />} />
          <Route exact path="/nekretnine" element={<Nekretnine />} />
          <Route exact path="/dodavanjenekretnina" element={<DodavanjeNekretnine />} />
          <Route exact path="/loginAgent" element={<LoginAgent addToken={addToken}/>} />
        </Routes>

      </div>
    </Router>

  );
}

export default App;
