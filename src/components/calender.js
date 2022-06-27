import Calendar from "react-calendar";
import useState from "react";

const Kalendar = () => {
    const [datum, setdatum] = useState();
    const onChange = datum => {
        setdatum(datum);
    }
    return (
        <div>
            <Calendar onChange={onChange} value={datum}></Calendar>
            {console.log(datum)}
            {datum.toString()}
        </div>
    );
}

export default Kalendar;