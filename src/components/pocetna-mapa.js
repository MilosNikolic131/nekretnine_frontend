import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import './pocetna-mapa.css';

const Pocetna = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyDNuWO4vThK7x66TutYN_rW2Hiz_iI0RXY" });

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <div className="pocetna">
            <h1>Pogledajte nase agente, odaberite nekretninu i lako zakazite obilazak</h1>
            <br></br>
            
            <br></br>
            <br></br>
            <br></br>
            <h2>Ili nas posetite na lokaciji:</h2>
            <br></br>
            <hr></hr>
            <br></br>
            
            <Map />
            
            <br></br>
            <hr></hr>
            <br></br>
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