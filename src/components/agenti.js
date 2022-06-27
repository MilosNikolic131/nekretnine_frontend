import React from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa"
import { useState, useEffect } from "react";
const Agenti = () => {
    const [current, setCurrent] = useState(0);
    const [sliderData, setSliderData] = useState();
    const [error, setError] = useState();
    const [length, setLenght] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/agent').then(res => {
            if (!res.ok) {
                throw Error('Ne moze se fecovati data');
            }
            return res.json();
        }).then(data => {
            console.log(data);
            setSliderData(data.data);
            setLenght(data.data.length);
            console.log(data.data.length);
        }).catch(err => {
            setError(err.message);
        })
    }, []);
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const previousSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }
    console.log(current);
    if (!Array.isArray(sliderData) || sliderData.length <= 0) {
        return null;
    }
    return (
        <section className="agenti">
            <FaArrowAltCircleLeft className="faarrow-left" onClick={previousSlide}></FaArrowAltCircleLeft>
            <FaArrowAltCircleRight className="faarrow-right" onClick={nextSlide}></FaArrowAltCircleRight>
            {sliderData.map((slide, index) => {
                return (< div className={index === current ? 'slide active' : 'slide'
                } key={index} >
                    {index === current && <div><img src={slide.image} alt="slika-agent" className="image" />
                        <h2>{slide.ime_i_prezime}</h2>
                        <p>{slide.JMBG}</p></div>

                    }
                </div>);
            })}

        </section >
    );
}

export default Agenti;