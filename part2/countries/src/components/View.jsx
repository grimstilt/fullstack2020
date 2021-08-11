import axios from "axios"
import { useEffect, useState } from "react"

const View = (props) => {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const url = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + props.country.capital

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
            })
    }, [])
    
    console.log(weather.current);

    return (
      <div>
        <h2>{props.country.name}</h2>
        <p>Capital {props.country.capital} </p>
        <p>Population {props.country.population} </p>
        <h3>Languages</h3>
        <ul>
            {props.country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
        <img src={props.country.flag} alt="flag" width="100" height="100"></img>
        <h3>Weather in {props.country.capital}</h3>
        {/* {weather.current.map(data => data.temperature)} */}
      </div>
    )
}

export default View