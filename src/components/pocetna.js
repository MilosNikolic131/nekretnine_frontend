import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './pocetna.css';

const Pocetna = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyDNuWO4vThK7x66TutYN_rW2Hiz_iI0RXY" });

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <div className="hero-container">
           <h1>DOBRODOŠLI NA NEKRETNINE MNM</h1>
      <p>Platforma od poverenja</p>
      <div className='hero-btns'>
      <Link to='/nekretnine'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          NEKRETNINE
        </Button>
        </Link>
        <Link to='/zakazivanje'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          OBLIZAK
        </Button>
        </Link>
        </div>
      
      </div>

     
      
    );
    function Map() {
        const center = useMemo(() => ({lat:44.787, lng : 20.457}), []);
        return <GoogleMap zoom={10} center ={center} mapContainerClassName = "map-container">
            <Marker position={center}/>
        </GoogleMap>
    }
}

export default Pocetna;