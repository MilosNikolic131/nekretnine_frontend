import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

const Pocetna = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "key" });

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <div className="pocetna">
            <h1>Dobrodosli na nas sajt</h1>
            <br></br>
            <hr></hr>
            <br></br>
            <h2>Pogledajte nase agente, odaberite nekretninu i lako zakazite obilazak</h2>
            <br></br>
            <p>Ili nas posetite na lokaciji:</p>
            <br></br>
            <hr></hr>
            <br></br>
            <Map />
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